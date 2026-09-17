"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./eyonic.css";

const IMG = "/images/new/eyonic-case-study";

const nav = (
  <nav className="eyo-nav">
    <Link href="/" className="eyo-nav-home">
      <img src={`${IMG}/anuga-icon.svg`} alt="" />
      Anuga
    </Link>
    <span className="eyo-nav-current">Eyonic ai</span>
  </nav>
);

export default function EyonicCaseStudy() {
  // SSR-safe portal mount gate — see the Octo Proxies case study for the
  // full explanation of why a `typeof document` branch would break
  // hydration here instead.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR-safe portal mount gate (see comment above)
  useEffect(() => setMounted(true), []);

  return (
    <div className="eyo-page">
      {/* Portaled into <body>, outside ScrollSmoother's #smooth-content —
          see the Octo Proxies case study for why a fixed nav needs this. */}
      {mounted && createPortal(nav, document.body)}

      <div className="eyo-container">
        <img src={`${IMG}/eyonic-icon.svg`} alt="" className="eyo-title-icon" />

        <div className="eyo-title-row">
          <div className="eyo-title-main">
            <h1 className="eyo-heading">Eyonic ai</h1>
            <div className="eyo-paragraphs">
              <p>
                Eyonic is a computer vision MES system that turns factory floor camera footage into real-time
                production data: cycle times, defect counts, hourly targets.
              </p>
              <p>
                My team developed a real-time MES dashboard that converts computer-vision footage from the factory
                floor into readable efficiency data, from factory-level down to individual stations.
              </p>
            </div>
          </div>
          <div className="eyo-title-meta">
            <h2 className="eyo-heading">Team</h2>
            <div className="eyo-role-list">
              <p>1 Designer (Me)</p>
              <p>1 Developer</p>
              <p>1 ML Specialist</p>
              <p>1 Data Scientist / BA</p>
              <p>1 Project Manager</p>
            </div>
            <p className="date">2025</p>
          </div>
        </div>

        <img src={`${IMG}/eyoni-img-cover.jpg`} alt="" className="eyo-img eyo-img-cover" />

        <section className="eyo-section-problem">
          <h2 className="eyo-heading">The problem</h2>
          <div className="eyo-paragraphs">
            <p>
              The factory had no way to see their own efficiency in real time. If a line started falling behind,
              nobody knew until someone walked the floor to find out. By then hours of output were already lost.
            </p>
            <p>
              The factory already tracked this data. Downtime, efficiency, quality, targets. All of it written by
              hand on whiteboards. They wanted the same information, but live so problems could be caught in
              minutes instead of hours.
            </p>
          </div>
        </section>

        <section className="eyo-section-business-problem">
          <h2 className="eyo-heading">The business problem</h2>
          <div className="eyo-paragraphs">
            <p>
              <strong>Problems weren&apos;t identified when they happened.</strong> An issue could occur on the
              floor and go unnoticed. And even once someone did spot it, there was no automatic way to alert
              whoever needed to act. It relied on someone noticing, then manually finding the right person, with no
              way to see whether it was already being handled.
            </p>
            <p>
              <strong>Two different asks.</strong> The factory wanted a tool built for their floor. The management
              wanted something that could eventually be sold to any factory. Both needed answering.
            </p>
          </div>
        </section>

        <p className="eyo-goal-label">The goal</p>
        <p className="eyo-goal-heading">
          How might we help factory team detect, understand and respond to operational problems in real time, while
          designing a flexible system that can adapt to different factories and workflows?
        </p>

        <section className="eyo-section-process">
          <h2 className="eyo-heading">Process</h2>
          <div className="eyo-paragraphs">
            <p>
              <strong>Problems weren&apos;t identified when they happened.</strong> An issue could occur on the
              floor and go unnoticed. And even once someone did spot it, there was no automatic way to alert
              whoever needed to act. It relied on someone noticing, then manually finding the right person, with no
              way to see whether it was already being handled.
            </p>
            <p>
              <strong>Two different asks.</strong> The factory wanted a tool built for their floor. The management
              wanted something that could eventually be sold to any factory. Both needed answering.
            </p>
          </div>
        </section>

        <img src={`${IMG}/eyoni-img-process.jpg`} alt="" className="eyo-img eyo-img-process" />

        <section className="eyo-section-research">
          <h2 className="eyo-heading">Research</h2>
          <div className="eyo-paragraphs">
            <p>
              This was a new industry, so research started before any interviews did. Terms like Yamazumi, SMV and
              Progressive Assembly Line had to be learned first so the questions asked in interviews would actually
              be useful instead of vague.
            </p>
          </div>
        </section>

        <img src={`${IMG}/eyoni-img-factoryvisit.jpg`} alt="" className="eyo-img eyo-img-factoryvisit" />

        <div className="eyo-cta-banner">
          <div className="eyo-cta-left">
            <img src={`${IMG}/red-face-sticker.svg`} alt="" className="eyo-cta-sticker" />
            <div className="eyo-cta-text">
              <p className="title">This is a preview of the full case study. Want the full case study?</p>
              <p className="subtitle">Reach out to anugakarunatilaka.22@gmail.com the complete story</p>
            </div>
          </div>
          <a href="mailto:anugakarunatilaka.22@gmail.com" className="eyo-cta-button">
            Say Hello!
          </a>
        </div>

        <hr className="eyo-divider" />

        <h2 className="eyo-heading eyo-next-project-heading">Next Project</h2>

        <Link
          href="/projects/octo-proxies"
          className="eyo-next-card"
          style={{ backgroundImage: "url(/octo-proxies-new.jpg)" }}
        >
          <div className="eyo-next-card-scrim" />
          <div className="eyo-next-card-caption">
            <p className="title">Branding for a proxy company</p>
            <p className="subtitle">Simplifying comparison, hierarchy and purchase priority</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
