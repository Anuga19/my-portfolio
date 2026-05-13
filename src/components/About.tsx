"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "User Research",   level: "Core" },
  { name: "Wireframing & IA", level: "Core" },
  { name: "Figma",           level: "Expert" },
  { name: "Prototyping",     level: "Strong" },
  { name: "Visual Design",   level: "Strong" },
  { name: "Design Systems",  level: "Learning" },
  { name: "HTML / CSS",      level: "Curious" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="about-section"
      style={{
        padding: "80px 110px",
        display: "flex",
        gap: 96,
        alignItems: "flex-start",
      }}
    >
      {/* Left: bio */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 32 }}>
        {[
          <>
            I&apos;m a UI/UX designer who grew up obsessing over{" "}
            <span style={{ color: "#ff2700" }}>
              interfaces, typography and why some products just feel right
            </span>
            . I believe great design is invisible — you only notice it when it&apos;s missing.
          </>,
          <>
            I approach every project with curiosity first. I ask a lot of questions, sketch
            obsessively, and iterate until the thing feels inevitable. I&apos;m early in my career
            but I bring a sharp eye and genuine care to everything I touch.
          </>,
          <>
            Currently open to internships, freelance projects and interesting conversations about
            design.
          </>,
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "32px",
              letterSpacing: -0.32,
              color: "#727272",
            }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Right: skill rows — exact Figma border design */}
      <div className="about-skills" style={{ width: 443.5 }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-row"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 14.4,
                letterSpacing: -0.576,
                color: "#727272",
              }}
            >
              {skill.name}
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: -0.5,
                color: "#ff2700",
              }}
            >
              {skill.level}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
