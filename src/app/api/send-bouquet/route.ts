// Sends the "you received a bouquet" email for Bouquet Builder
// (/playground/flower-bouquet). The page posts the recipient, the sender's
// email, a short message and the bouquet link; Resend delivers it from an
// address on this domain, with replies going to the sender.
//
// Needs RESEND_API_KEY in the Vercel project's environment variables, and
// anugadesigns.site verified as a sending domain in Resend.

const FROM = process.env.BOUQUET_FROM ?? "Bouquet Builder <bouquet@anugadesigns.site>";
const LINK_PREFIXES = [
  "https://www.anugadesigns.site/playground/flower-bouquet#",
  "https://anugadesigns.site/playground/flower-bouquet#",
];
const TEXT_MAX = 240;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

// A small brake on misuse: at most LIMIT emails per address per window.
// It lives in memory, so it resets when the server instance restarts.
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function allowed(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return fail(503, "not_configured");

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return fail(400, "bad_request"); }

  const to = String(body.to ?? "").trim();
  const from = String(body.from ?? "").trim();
  const text = String(body.text ?? "").trim().slice(0, TEXT_MAX);
  const link = String(body.link ?? "");
  // filled in only by bots; real visitors never see this field
  if (body.website) return Response.json({ ok: true });

  if (!EMAIL_RE.test(to) || to.length > 254) return fail(400, "bad_to");
  if (!EMAIL_RE.test(from) || from.length > 254) return fail(400, "bad_from");
  // only links to a bouquet on this site, so the endpoint cannot mail arbitrary URLs
  if (link.length > 2000 || !LINK_PREFIXES.some((p) => link.startsWith(p))) return fail(400, "bad_link");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allowed(`ip:${ip}`) || !allowed(`to:${to.toLowerCase()}`)) return fail(429, "rate_limited");

  const html = `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#2b2b2b">
  <p style="font-size:20px;margin:0 0 20px">You have received a bouquet.</p>
  ${text ? `<p style="font-size:16px;line-height:1.5;margin:0 0 24px;white-space:pre-wrap">${esc(text)}</p>` : ""}
  <p style="margin:0 0 28px"><a href="${esc(link)}" style="display:inline-block;background:#2b2b2b;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:600">Open your bouquet</a></p>
  <p style="font-size:13px;color:#8c8c8c;margin:0">Sent by ${esc(from)} with Bouquet Builder. Reply to this email to write back to them.</p>
</div>`;
  const plain = `You have received a bouquet.\n\n${text ? `${text}\n\n` : ""}Open your bouquet:\n${link}\n\nSent by ${from} with Bouquet Builder. Reply to this email to write back to them.`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: from, subject: "A bouquet for you", html, text: plain }),
  });
  if (!res.ok) {
    console.error("send-bouquet: Resend refused the email", res.status, await res.text());
    return fail(502, "send_failed");
  }
  return Response.json({ ok: true });
}
