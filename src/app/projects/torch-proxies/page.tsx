"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./torch-proxies.css";

const IMG = "/images/torch-proxies";

const nav = (
  <nav className="tp2-nav">
    <Link href="/" className="tp2-nav-home">
      <img src="/images/new/octo-case-study/anuga-icon.svg" alt="" />
      Anuga
    </Link>
    <span className="tp2-nav-current">Torch Proxies</span>
  </nav>
);

const Paragraphs = ({ children }: { children: React.ReactNode }) => (
  <div className="tp2-paragraphs">{children}</div>
);

export default function TorchProxies() {
  // SSR-safe portal mount gate — see the Octo Proxies case study for the
  // full explanation of why a `typeof document` branch would break
  // hydration here instead.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="tp2-page">
      {/* Portaled into <body>, outside ScrollSmoother's #smooth-content —
          see the Octo Proxies case study for why a fixed nav needs this. */}
      {mounted && createPortal(nav, document.body)}

      <div className="tp2-container">
        <img src={`${IMG}/icon-torch.svg`} alt="" className="tp2-title-icon" />

        <div className="tp2-title-row">
          <div className="tp2-title-main">
            <h1 className="tp2-heading">Torch Proxies</h1>
            <Paragraphs>
              <p>
                Torch Proxies is a self-serve platform for purchasing and managing residential and ISP proxies.
                Within the dashboard, users can create proxies by configuring a sub user, country, authentication
                type, session type and quantity.
              </p>
              <p>
                The system knew when a proxy couldn&apos;t be generated. The user didn&apos;t. A sub user&apos;s
                remaining data determined whether generation would succeed, but that information wasn&apos;t
                visible in the flow, users could complete the entire configuration and only find out they were
                short on data after pressing Generate.
              </p>
            </Paragraphs>
          </div>
          <div className="tp2-title-meta">
            <h2 className="tp2-heading">Team</h2>
            <div className="tp2-role-list">
              <p>1 Designer (Me)</p>
              <p>1 Developer</p>
            </div>
            <p className="date">2025</p>
          </div>
        </div>

        <img src={`${IMG}/img-cover.jpg`} alt="" className="tp2-img tp2-img-hero" />

        {/* ── FRICTION ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">The generation flow had a hidden prerequisite</h2>
          <Paragraphs>
            <p>Generating a proxy consumes data from the selected sub user&apos;s balance.</p>
          </Paragraphs>

          <img src={`${IMG}/img-subuser.png`} alt="" className="tp2-img" />

          <Paragraphs>
            <p>
              A sub user is a separate account under the main account, each with its own allocation of purchased
              data.
            </p>
            <p>The problem was that the generation flow depended on this balance without exposing it.</p>
            <p>The existing flow looked roughly like this:</p>
            <p>
              <strong>Select sub-user → Country → Authentication → Session type → Quantity → Generate</strong>
            </p>
            <p>
              The balance was only checked when the user attempted to generate the proxy. If the sub-user
              didn&apos;t have enough data, the request failed.
            </p>
            <p>
              <strong>The system had the information. The interface didn&apos;t.</strong>
            </p>
          </Paragraphs>

          <div className="tp2-callout">
            <p>
              <span className="lead">The system had the information. The interface didn&apos;t. </span>
              <span className="rest">
                That meant someone could spend time configuring a proxy only to discover at the final step that they
                couldn&apos;t actually generate it.
              </span>
            </p>
          </div>

          <Paragraphs>
            <p>
              The failure wasn&apos;t necessarily in the validation itself. <strong>It was in when the constraint
              was communicated.</strong>
            </p>
          </Paragraphs>
        </section>

        {/* ── CONSTRAINT ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">Tracing where the failure entered the workflow</h2>
          <Paragraphs>
            <p>
              Started by mapping the generation flow to understand what information the user and system had at each
              stage.
            </p>
          </Paragraphs>

          <img src={`${IMG}/img-userflow.png`} alt="" className="tp2-img" />

          <Paragraphs>
            <p>
              The balance was a prerequisite for completing the task, but it wasn&apos;t part of the user&apos;s
              decision making process.
            </p>
          </Paragraphs>

          <div className="tp2-table">
            <div className="tp2-table-row head">
              <p>Stage</p>
              <p>What the user sees</p>
              <p>What the system knows</p>
            </div>
            <div className="tp2-table-row">
              <p>Select sub-user</p>
              <p>Which sub user is selected</p>
              <p>Their remaining balance</p>
            </div>
            <div className="tp2-table-row">
              <p>Configure proxy</p>
              <p>Country, auth, quantity etc...</p>
              <p>Whether the balance will be sufficient</p>
            </div>
            <div className="tp2-table-row">
              <p>Generate</p>
              <p>The action to create the proxy</p>
              <p>Balance is validated</p>
            </div>
            <div className="tp2-table-row">
              <p>Failure</p>
              <p>An error message</p>
              <p>The request cannot proceed</p>
            </div>
          </div>

          <div className="tp2-callout">
            <p>
              <span className="rest">This exposed the underlying issue. </span>
              <span className="lead">
                A critical system constraint was being revealed at the point of failure instead of the point where
                the user could act on it.
              </span>
            </p>
          </div>
        </section>

        {/* ── TRACING THE FAILURE ── */}
        <section className="tp2-section">
          <Paragraphs>
            <p>That created two problems.</p>
          </Paragraphs>

          <img src={`${IMG}/two-problems-card.png`} alt="" className="tp2-img-plain" style={{ marginTop: 32 }} />

          <div className="tp2-two-col">
            <div>
              <p className="tp2-subheading">1. The constraint was invisible</p>
              <p>
                There was no way to know how much data the selected sub-user had before starting the configuration.
              </p>
            </div>
            <div>
              <p className="tp2-subheading">2. The failure had no useful recovery</p>
              <p>
                When generation failed, the error didn&apos;t clearly explain what had happened or provide a direct
                path to resolve it.
              </p>
            </div>
          </div>

          <Paragraphs>
            <p>
              The user was left to figure out where to update the sub-user&apos;s balance or look through
              documentation for the answer.
            </p>
          </Paragraphs>
        </section>

        {/* ── REFRAMING THE PROBLEM ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">The opportunity was bigger than showing a number</h2>
          <Paragraphs>
            <p>
              The obvious fix was to display the remaining balance. But simply adding a number wouldn&apos;t solve
              the whole problem.
            </p>
            <p>The information needed to answer three questions at the right moment:</p>
          </Paragraphs>

          <ul className="tp2-list">
            <li>How much data is available?</li>
            <li>Can I generate with this account?</li>
            <li>If I can&apos;t, what can I do about it?</li>
          </ul>

          <Paragraphs>
            <p>
              That led to a simple design principle. <strong>Surface the constraint before the commitment.</strong>
            </p>
            <p>
              Instead of allowing the user to discover the problem after completing the form, the interface should
              make the selected sub user&apos;s state clear before they invest effort in the configuration.
            </p>
          </Paragraphs>
        </section>

        {/* ── EXPLORING THE FIX ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">Exploring how the balance should appear</h2>
          <Paragraphs>
            <p>I explored a few ways to introduce the information without disrupting the existing generation flow.</p>
          </Paragraphs>

          <p className="tp2-subheading" style={{ marginTop: 32 }}>
            Inline Balance
          </p>
          <Paragraphs>
            <p>The first approach placed the remaining balance directly beside the sub-user selector.</p>
            <p>It kept the change lightweight and connected the information to the account it belonged to.</p>
            <p>But the balance was important enough that it risked becoming just another piece of text in the form.</p>
          </Paragraphs>

          <p className="tp2-subheading" style={{ marginTop: 32 }}>
            Progress Indicator
          </p>
          <Paragraphs>
            <p>I also explored representing the balance visually through a progress bar showing used versus remaining data.</p>
            <p>
              This made the relationship between usage and capacity easier to understand, but introduced more visual
              complexity than was necessary for a simple account state.
            </p>
          </Paragraphs>

          <p className="tp2-subheading" style={{ marginTop: 32 }}>
            A contextual status block
          </p>
          <Paragraphs>
            <p>
              The final direction treated the balance as part of the selected sub-user&apos;s state rather than
              another field in the form.
            </p>
            <p>That allowed the interface to communicate more than just a number:</p>
            <p>
              <strong>Usage → Remaining balance → Account status → Next action</strong>
            </p>
            <p>
              This made the information harder to miss while keeping it directly connected to the sub-user the user
              had selected.
            </p>
          </Paragraphs>
        </section>

        {/* ── DESIGNING THE STATES ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">Making the system state visible</h2>
          <Paragraphs>
            <p>Once a sub-user is selected, the new status block immediately shows their current data state.</p>
          </Paragraphs>

          <p className="tp2-subheading" style={{ marginTop: 32 }}>
            Active state
          </p>
          <Paragraphs>
            <p>The user can see: data used, data remaining and account status</p>
          </Paragraphs>

          <img src={`${IMG}/img-exp1.jpg`} alt="" className="tp2-img" />

          <Paragraphs>
            <p>
              The balance is now available before they begin configuring the proxy. <strong>There is no need to
              start the process and wait for the system to tell them whether they can finish it.</strong>
            </p>
          </Paragraphs>
        </section>

        <section className="tp2-section">
          <h2 className="tp2-heading">Designing for the failure state</h2>
          <Paragraphs>
            <p>The zero-balance case was just as important as the normal state.</p>
            <p>If the balance reaches zero, the status block changes to clearly communicate that the sub-user is inactive.</p>
          </Paragraphs>

          <img src={`${IMG}/img-exp2.jpg`} alt="" className="tp2-img" />

          <Paragraphs>
            <p>Instead of ending with an error after the user has completed the form, the interface now tells them:</p>
            <p>
              <strong>0 balance → Inactive → Add more data</strong>
            </p>
            <p>A direct action takes them to that sub-user&apos;s page where they can add more data.</p>
            <p>The recovery path is therefore part of the state itself.</p>
          </Paragraphs>
        </section>

        {/* ── SOLUTION ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">From failure to informed action</h2>
          <Paragraphs>
            <p>The original experience made the user discover the constraint at the end:</p>
            <p>
              <strong>Configure → Generate → Fail → Figure out why → Find where to fix it</strong>
            </p>
            <p>The redesigned experience moves that information forward:</p>
            <p>
              <strong>Select sub-user → See balance → Decide whether to continue → Generate</strong>
            </p>
            <p>And when there isn&apos;t enough data:</p>
            <p>
              <strong>Select sub-user → See inactive state → Add data</strong>
            </p>
            <p>The system no longer waits for the user to encounter the problem before explaining it.</p>
          </Paragraphs>
        </section>

        {/* ── OUTCOME ── */}
        <section className="tp2-section">
          <h2 className="tp2-heading">What changed</h2>
          <Paragraphs>
            <p>
              The redesign wasn&apos;t about adding another card to the interface. It was about{" "}
              <strong>changing when the product communicates an important piece of system state.</strong>
            </p>
            <p>
              A balance that previously existed as an invisible prerequisite became visible at the point where it
              could influence the user&apos;s decision.
            </p>
            <p>The zero-balance state also became an actionable state rather than a dead end.</p>
          </Paragraphs>

          <div className="tp2-compare">
            <div>
              <img src={`${IMG}/screen-recording.png`} alt="" />
              <p className="note-heading">Before</p>
              <p className="note-body">The system validates the constraint after the user commits.</p>
            </div>
            <div>
              <img src={`${IMG}/worst-scenario.png`} alt="" />
              <p className="note-heading">After</p>
              <p className="note-body">The interface exposes the constraint before the user commits.</p>
            </div>
          </div>

          <Paragraphs>
            <p>This was one of several improvements made as part of the broader Torch Proxies dashboard overhaul.</p>
          </Paragraphs>
        </section>

        <hr className="tp2-divider" />

        <h2 className="tp2-heading tp2-next-project-heading">Next Project</h2>

        <Link
          href="/projects/octo-proxies"
          className="tp2-next-card"
          style={{ backgroundImage: "url(/octo-proxies-new.jpg)" }}
        >
          <div className="tp2-next-card-scrim" />
          <div className="tp2-next-card-caption">
            <p className="title">Branding for a proxy company</p>
            <p className="subtitle">Simplifying comparison, hierarchy and purchase priority</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
