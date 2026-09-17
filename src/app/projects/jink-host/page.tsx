"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./jink-host.css";

const IMG = "/images/jink-host-v2";

const nav = (
  <nav className="jh2-nav">
    <Link href="/" className="jh2-nav-home">
      <img src="/images/new/octo-case-study/anuga-icon.svg" alt="" />
      Anuga
    </Link>
    <span className="jh2-nav-current">Jink Host</span>
  </nav>
);

export default function JinkHost() {
  // SSR-safe portal mount gate — see the Octo Proxies case study for the
  // full explanation of why a `typeof document` branch would break
  // hydration here instead.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="jh2-page">
      {/* Portaled into <body>, outside ScrollSmoother's #smooth-content —
          see the Octo Proxies case study for why a fixed nav needs this. */}
      {mounted && createPortal(nav, document.body)}

      <div className="jh2-container">
        <img src={`${IMG}/jink-icon.png`} alt="" className="jh2-title-icon" />

        <div className="jh2-title-row">
          <div className="jh2-title-main">
            <h1 className="jh2-heading">Jink Host</h1>
            <div className="jh2-paragraphs">
              <p>
                Jink Host offers VPS, RDP, cloud storage, dedicated servers and domains. That sounds straightforward.
                Until you try to put all of it on one landing page.
              </p>
              <p>
                There are different products, server locations, performance tiers, configurations and use cases to
                explain all to people who may not necessarily understand the technical differences between them.
              </p>
            </div>
          </div>
          <div className="jh2-title-meta">
            <h2 className="jh2-heading">Team</h2>
            <div className="jh2-role-list">
              <p>1 Designer (Me)</p>
              <p>1 Developer (Me)</p>
            </div>
            <p className="date">2025</p>
          </div>
        </div>

        <img src={`${IMG}/img-cover.jpg`} alt="" className="jh2-img jh2-img-hero" />

        <div className="jh2-callout" style={{ marginTop: 84 }}>
          <p>The challenge wasn&apos;t creating more information. It was deciding what information deserved attention first.</p>
        </div>

        <section className="jh2-section">
          <h2 className="jh2-heading">Too many things competing for the first impression</h2>
          <div className="jh2-paragraphs">
            <p>The brief came with a fairly broad product offering.</p>
            <p>
              VPS and RDP were the main focus, but the website also needed to introduce dedicated servers, cloud
              storage and domains. The client also wanted to highlight EU and USA server locations, Budget and
              Premium CPU options and a custom VPS configuration.
            </p>
          </div>

          <img src={`${IMG}/img-beforeafter.jpg`} alt="" className="jh2-img" />

          <div className="jh2-paragraphs">
            <p>
              Every one of these things could become a section. <strong>But giving everything the same visual weight
              would make the page harder to understand.</strong>
            </p>
            <p>So I started with a simpler question.</p>
            <p>
              <strong>What does someone need to know before they&apos;re ready to choose a hosting plan?</strong>
            </p>
            <p>That became the basis for the page hierarchy.</p>
          </div>
        </section>

        <section className="jh2-section">
          <h2 className="jh2-heading">Didn&apos;t want the page to feel like a product catalogue</h2>
          <div className="jh2-paragraphs">
            <p>Hosting websites can easily turn into specification sheets.</p>
            <p>CPU, RAM, storage, locations, plans, pricing and more specifications.</p>
            <p>That approach gives users information, but it doesn&apos;t necessarily help them make a decision.</p>
            <p>
              For Jink Host, I wanted the page to <strong>feel more like a guided introduction to the products.</strong>
            </p>
          </div>

          <img src={`${IMG}/img-process.png`} alt="" className="jh2-img" />

          <div className="jh2-paragraphs">
            <p>The client&apos;s original structure gave me the sections to work with. My job was to turn those sections into a progression.</p>
          </div>
        </section>

        <section className="jh2-section">
          <h2 className="jh2-heading">The VPS section had a problem of its own</h2>
          <div className="jh2-paragraphs">
            <p>The VPS offering had several choices packed into it.</p>
          </div>

          <ul className="jh2-list">
            <li>EU or USA?</li>
            <li>Budget or Premium CPU?</li>
            <li>How much RAM?</li>
            <li>How many CPU cores?</li>
            <li>How much storage?</li>
          </ul>

          <div className="jh2-paragraphs">
            <p>
              And then there was the custom VPS option, where users could build their own configuration. The client
              specifically wanted this flexibility to stand out as a differentiator.
            </p>
            <p>The challenge was making those choices feel manageable.</p>
          </div>

          <img src={`${IMG}/img-pricing.jpg`} alt="" className="jh2-img" />

          <div className="jh2-paragraphs">
            <p>I didn&apos;t want users to have to understand every specification before they could figure out what was relevant to them.</p>
            <p>
              <strong>The configuration should feel like a choice, not a technical exam.</strong>
            </p>
            <p>That became an important consideration in how I presented the VPS options.</p>
          </div>
        </section>

        <section className="jh2-section">
          <h2 className="jh2-heading">Designing within an existing identity</h2>
          <div className="jh2-paragraphs">
            <p>The visual identity was already established before I started the landing page.</p>
            <p>
              The logo, typography and core colour palette had already been defined, giving me a visual foundation
              to work with rather than something I needed to create from scratch.
            </p>
            <p>My job was to take that identity and translate it into a complete digital experience.</p>
            <p>
              The challenge was making the existing visual language work across a page with a lot of technical
              information without letting the interface become visually heavy.
            </p>
            <p>I kept the core identity intact while using hierarchy, spacing and layout to give the content more room to breathe.</p>
            <p>The brand didn&apos;t need to change. The way it was presented needed to work for the web.</p>
          </div>
        </section>

        <section className="jh2-section">
          <h2 className="jh2-heading">Designing something that could actually be built</h2>
          <div className="jh2-paragraphs">
            <p>
              There was another consideration that wasn&apos;t visible in the final design. Jink Host already had an
              existing setup, including WHMCS compatibility, and the new website needed to work within that
              environment.
            </p>
            <p>So I wasn&apos;t designing a completely isolated concept. I had to think about how the page would behave as a real website.</p>
          </div>
        </section>

        <section className="jh2-section">
          <h2 className="jh2-heading">Figma was only half of the job</h2>
          <div className="jh2-paragraphs">
            <p>Once the design was established, I vibecoded the landing page myself. This changed the way I looked at the design.</p>
            <p>A layout can look perfectly balanced in Figma and feel completely different in a browser.</p>
            <p>Spacing changes. Text wraps differently. Sections become much taller on smaller screens. Interactions need to make sense.</p>
            <p>So instead of treating development as the final step, I used the vibecoded version to refine the design itself.</p>
            <p>
              <strong>The browser became another design tool.</strong>
            </p>
          </div>
        </section>

        <section className="jh2-section">
          <h2 className="jh2-heading">The result wasn&apos;t about adding more</h2>
          <div className="jh2-paragraphs">
            <p>The final landing page brings Jink Host&apos;s products, VPS options, configurations and supporting information into one experience.</p>
            <p>But the goal wasn&apos;t to show everything at once. It was to gradually answer the questions a visitor is likely to have.</p>
          </div>

          <ul className="jh2-list">
            <li>
              <strong>What does Jink Host offer?</strong>
            </li>
            <li>
              <strong>What should I choose?</strong>
            </li>
            <li>
              <strong>What makes the options different?</strong>
            </li>
            <li>
              <strong>Why should I trust them?</strong>
            </li>
          </ul>

          <div className="jh2-paragraphs">
            <p>And finally:</p>
          </div>

          <ul className="jh2-list">
            <li>
              <strong>Where do I go from here?</strong>
            </li>
          </ul>

          <div className="jh2-paragraphs">
            <p>The result is a landing page that gives the business room to communicate a fairly complex product range without making the experience feel equally complex.</p>
            <p>
              <strong>Less about showing everything. More about showing the right thing at the right time.</strong>
            </p>
          </div>

          <a href="https://jink.host/" target="_blank" rel="noopener noreferrer" className="jh2-cta-button">
            Visit Website ↗
          </a>
        </section>

        <hr className="jh2-divider" />

        <h2 className="jh2-heading jh2-next-project-heading">Next Project</h2>

        <Link href="/projects/torch-proxies" className="jh2-next-card" style={{ backgroundImage: "url(/torch-proxies-new.jpg)" }}>
          <div className="jh2-next-card-scrim" />
          <div className="jh2-next-card-caption">
            <p className="title">Designing a proxy generation flow</p>
            <p className="subtitle">Surfacing data balance before users hit Generate</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
