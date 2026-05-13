"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const IMG_SHIELD  = "/projects/shield.jpg";
const IMG_TORCH   = "/projects/torch.jpg";
const IMG_JINK    = "/projects/jink.jpg";
const IMG_ROVEX   = "/projects/rovex.jpg";
const IMG_GRYFFIN = "/projects/gryffin.jpg";

const IMG_DISCORD2   = "/projects/discord2.jpg";
const IMG_4TH_JULY   = "/projects/4th-july.jpg";
const IMG_DISCORD5   = "/projects/discord5.jpg";
const IMG_DISCORD1   = "/projects/discord1.jpg";
const IMG_IMAGE01    = "/projects/image01.jpg";
const IMG_FEB_DROP   = "/projects/feb-drop.jpg";
const IMG_DISCORD3   = "/projects/discord3.jpg";
const IMG_DISCORD4   = "/projects/discord4.jpg";
const IMG_DISCORD6   = "/projects/discord6.jpg";

type Project = {
  id: number;
  title: string;
  desc: string;
  href: string;
  external?: boolean;
  noBorder?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Shield Proxies Dashboard Design",
    desc: "The main interface customers use to purchase and manage proxies.",
    href: "/coming-soon",
  },
  {
    id: 2,
    title: "Torch Proxies Enterprise Dashboard Design",
    desc: "The main interface customers use to purchase and manage proxies.",
    href: "/coming-soon",
  },
  {
    id: 3,
    title: "Jink Host Landing Page Design",
    desc: "Redesigned a VPS provider's website to match their new brand identity.",
    href: "https://jink.host/",
    external: true,
  },
  {
    id: 4,
    title: "Rovex Brand Identity",
    desc: "Crafted the brand identity for Rovex, an event management platform.",
    href: "https://www.behance.net/gallery/237685991/Revex-Branding",
    external: true,
  },
  {
    id: 5,
    title: "Campaign Assets",
    desc: "Designed Discord promotion assets for Shield Proxies.",
    href: "/coming-soon",
    noBorder: true,
  },
  {
    id: 6,
    title: "Gryffin Analytics Landing Page",
    desc: "Redesigned a VPS provider's website to match their new brand identity.",
    href: "/coming-soon",
  },
];

/* Renders the image area for each card */
function CardImage({ id }: { id: number }) {
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    maxWidth: "none",
    pointerEvents: "none",
  };

  if (id === 1)
    return <img src={IMG_SHIELD} alt="" style={{ ...base, objectPosition: "left 50% top 0" }} draggable={false} />;

  if (id === 2)
    return <img src={IMG_TORCH} alt="" style={{ ...base, objectPosition: "left 0 top 0" }} draggable={false} />;

  if (id === 3)
    return <img src={IMG_JINK} alt="" style={{ ...base, objectPosition: "center center" }} draggable={false} />;

  if (id === 4)
    return (
      <img
        src={IMG_ROVEX}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          width: 866,
          height: 771,
          left: "50%",
          top: "calc(50% + 0.5px)",
          transform: "translate(-50%, -50%)",
          maxWidth: "none",
          pointerEvents: "none",
          objectFit: "cover",
        }}
      />
    );

  if (id === 5) {
    const collage = [
      { src: IMG_DISCORD2,  left: 34,   top: -12,  w: 386, h: 217 },
      { src: IMG_4TH_JULY,  left: 436,  top: -12,  w: 385, h: 216 },
      { src: IMG_DISCORD5,  left: -369, top: -12,  w: 386, h: 217 },
      { src: IMG_DISCORD1,  left: -160, top: 222,  w: 385, h: 217 },
      { src: IMG_IMAGE01,   left: 243,  top: 222,  w: 385, h: 216 },
      { src: IMG_FEB_DROP,  left: 644,  top: 222,  w: 385, h: 216 },
      { src: IMG_DISCORD3,  left: -263, top: 455,  w: 386, h: 217 },
      { src: IMG_DISCORD4,  left: 138,  top: 455,  w: 386, h: 217 },
      { src: IMG_DISCORD6,  left: 539,  top: 455,  w: 386, h: 217 },
    ];
    return (
      <>
        {collage.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              left: img.left,
              top: img.top,
              width: img.w,
              height: img.h,
              objectFit: "cover",
              maxWidth: "none",
              pointerEvents: "none",
            }}
          />
        ))}
      </>
    );
  }

  if (id === 6)
    return <img src={IMG_GRYFFIN} alt="" style={{ ...base, objectPosition: "center center" }} draggable={false} />;

  return null;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 32, flexShrink: 0, width: 660 }}
    >
      {/* Image card */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: "#ffffff",
          border: project.noBorder ? "none" : "1px solid #ededed",
          borderRadius: 4,
          width: 660,
          height: 660,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <CardImage id={project.id} />
      </motion.div>

      {/* Caption */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 20,
            color: "#ff2700",
            letterSpacing: -0.8,
            textTransform: "capitalize",
            lineHeight: "normal",
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 16,
            color: "#727272",
            letterSpacing: -0.64,
            lineHeight: "normal",
          }}
        >
          {project.desc}
        </div>
      </div>
    </motion.div>
  );

  const linkStyle: React.CSSProperties = { textDecoration: "none", display: "block" };

  if (project.external) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={project.href} style={linkStyle}>
      {inner}
    </Link>
  );
}

export default function Projects() {
  return (
    <section style={{ padding: "60px 0" }}>
      <div
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            padding: "0 24px 40px",
            width: "max-content",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
