"use client";

import TopNav from "@/components/v2/TopNav";
import "./about.css";

const experience: { title: string; company: string; date: string; icon: string; plainIcon?: boolean }[] = [
  {
    title: "UI UX Designer",
    company: "Torchproxies",
    date: "February 2025 - July 2026",
    icon: "/images/new/about/torch-icon.svg",
  },
  {
    title: "UI UX Designer Intern",
    company: "Torchproxies & Shield Proxies",
    date: "February 2024 - July 2025",
    icon: "/images/new/about/torch-icon.svg",
  },
  {
    title: "UI UX Designer Intern",
    company: "Prifina",
    date: "Jan 2024 - March 2024",
    icon: "/images/new/about/prifina-logo.png",
    plainIcon: true,
  },
];

export default function About() {
  return (
    <div className="v2-about-page">
      <TopNav />
      <div className="v2-about-content">
        <div className="v2-about-hero">
          <div className="v2-about-hero-photo">
            <div className="v2-photo-card">
              <img src="/images/new/about/photo-hero.jpg" alt="Anuga relaxing outdoors" />
            </div>
          </div>
          <div className="v2-about-hero-text">
            <h1 className="v2-about-heading">Hey! It&apos;s Anuga</h1>
            <div className="v2-about-paragraphs">
              <p>
                I&apos;ve always been curious about what makes people connect with certain things. Why do we return
                to the same shows, choose certain products or instantly feel comfortable using some apps over
                others? What makes a design memorable or a brand hard to ignore?
              </p>
              <p>
                I enjoy digging into the reasoning behind those choices. To me, every product, interface, and brand
                has something to say through the way it looks, feels and works, whether intentional or not.
              </p>
            </div>
          </div>
        </div>

        <div className="v2-about-experience">
          <div className="v2-about-experience-main">
            <h2 className="v2-about-experience-heading">Experience</h2>
            <div className="v2-about-experience-list">
              {experience.map((item) => (
                <div key={item.title + item.date} className="v2-about-experience-row">
                  <div className={`v2-about-experience-icon${item.plainIcon ? " plain" : ""}`}>
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="v2-about-experience-info">
                    <div className="v2-about-experience-role">
                      <p className="title">{item.title}</p>
                      <p className="company">{item.company}</p>
                    </div>
                    <p className="v2-about-experience-date">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="v2-about-experience-photos">
            <div className="v2-about-experience-photo-1">
              <div className="v2-photo-card">
                <img src="/images/new/about/photo-group-warm.jpg" alt="Team photo" />
              </div>
            </div>
            <div className="v2-about-experience-photo-2">
              <div className="v2-photo-card">
                <img src="/images/new/about/photo-group-blue.jpg" alt="Team photo" />
              </div>
            </div>
            <div className="v2-about-experience-photo-3">
              <div className="v2-photo-card">
                <img src="/images/new/about/photo-kiosk.jpg" alt="Presenting at a booth" />
              </div>
            </div>
          </div>
        </div>

        <div className="v2-about-outside">
          <div className="v2-about-outside-photos">
            <div className="v2-about-outside-photo-1">
              <div className="v2-photo-card">
                <img src="/images/new/about/photo-outside-palms.jpg" alt="Palm trees along the coast" />
              </div>
            </div>
            <div className="v2-about-outside-photo-2">
              <div className="v2-photo-card">
                <img src="/images/new/about/photo-outside-cat.jpg" alt="My cat relaxing outdoors" />
              </div>
            </div>
          </div>
          <div className="v2-about-outside-text">
            <h2 className="v2-about-heading">Outside Work</h2>
            <div className="v2-about-paragraphs">
              <p>
                Outside of work, I drink way too much coffee, take care of my cat, take photos, and build random
                side projects that mix design and development.
              </p>
            </div>
          </div>
        </div>

        <div className="v2-about-cta">
          <div className="v2-about-cta-left">
            <img src="/images/new/about/cta-face-sticker.svg" alt="" className="v2-about-cta-sticker" />
            <div className="v2-about-cta-text">
              <p className="title">Currently looking for a place to work, learn and grow.</p>
              <p className="subtitle">
                If you have an opportunity or want to collaborate, feel free to reach out at
                anugakarunatilaka.22@gmail.com
              </p>
            </div>
          </div>
          <a href="mailto:anugakarunatilaka.22@gmail.com" className="v2-about-cta-button">
            Say Hello!
          </a>
        </div>
      </div>
    </div>
  );
}
