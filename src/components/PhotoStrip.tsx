"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const IMG_0335 = "/photos/p1.jpg";
const IMG_0547 = "/photos/p2.jpg";
const IMG_1095 = "/photos/p3.jpg";
const IMG_2683 = "/photos/p4.jpg";
const IMG_2447 = "/photos/p5.jpg";
const IMG_1365 = "/photos/p6.jpg";
const IMG_0004 = "/photos/p7.jpg";
const IMG_0937 = "/photos/p8.jpg";
const IMG_2512 = "/photos/p9.jpg";
const IMG_1369 = "/photos/p10.jpg";

/*
  Each photo carries:
  - cardWidth / cardHeight : outer clipping card dimensions
  - imgW / imgH            : image element size (from Figma)
  - imgLeft / imgTop       : offset of the image inside the card (from Figma)
  - translateX / translateY: CSS translate applied to image wrapper (from Figma)
*/
const photos = [
  {
    src: IMG_0335,
    cardWidth: 232,
    imgW: 239, imgH: 319,
    imgLeft: "calc(50% + 0.5px)", imgTop: "50%",
    translateX: "-50%", translateY: "-50%",
  },
  {
    src: IMG_0547,
    cardWidth: 232,
    imgW: 232, imgH: 309,
    imgLeft: "0", imgTop: "50%",
    translateX: "0", translateY: "-50%",
  },
  {
    src: IMG_1095,
    cardWidth: 232,
    imgW: 264, imgH: 352,
    imgLeft: "50%", imgTop: "-30px",
    translateX: "-50%", translateY: "0",
  },
  {
    src: IMG_2683,
    cardWidth: 232,
    imgW: 241, imgH: 321,
    imgLeft: "-5px", imgTop: "50%",
    translateX: "0", translateY: "-50%",
  },
  {
    src: IMG_2447,
    cardWidth: 232,
    imgW: 232, imgH: 310,
    imgLeft: "0", imgTop: "-9px",
    translateX: "0", translateY: "0",
  },
  {
    src: IMG_1365,
    cardWidth: 232,
    imgW: 232, imgH: 310,
    imgLeft: "0", imgTop: "calc(50% + 0.5px)",
    translateX: "0", translateY: "-50%",
  },
  {
    src: IMG_0004,
    cardWidth: 232,
    imgW: 266, imgH: 355,
    imgLeft: "-17px", imgTop: "-46px",
    translateX: "0", translateY: "0",
  },
  {
    src: IMG_0937,
    cardWidth: 464,           // wide card
    imgW: 480, imgH: 360,
    imgLeft: "-8px", imgTop: "-42px",
    translateX: "0", translateY: "0",
  },
  {
    src: IMG_2512,
    cardWidth: 232,
    imgW: 234, imgH: 312,
    imgLeft: "-2px", imgTop: "calc(50% + 0.5px)",
    translateX: "0", translateY: "-50%",
  },
  {
    src: IMG_1369,
    cardWidth: 232,
    imgW: 254, imgH: 339,
    imgLeft: "-11px", imgTop: "-12px",
    translateX: "0", translateY: "0",
  },
] as const;

export default function PhotoStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "80px 0 60px" }}>
      {/* Section heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 36,
          letterSpacing: -1.728,
          color: "#141311",
          marginBottom: 32,
          paddingLeft: 24,
        }}
      >
        When I&apos;m not designing
      </motion.h2>

      {/* Draggable photo strip */}
      <motion.div
        ref={stripRef}
        drag="x"
        dragConstraints={stripRef}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          padding: "0 24px 8px",
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          alignItems: "center",
        }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.05, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4 }}
            style={{
              background: "#f9f9f9",
              border: "1px solid #ededed",
              borderRadius: 4,
              height: 293,
              flexShrink: 0,
              width: photo.cardWidth,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Inner image wrapper — exact Figma offsets */}
            <div
              style={{
                position: "absolute",
                width: photo.imgW,
                height: photo.imgH,
                left: photo.imgLeft,
                top: photo.imgTop,
                transform: `translate(${photo.translateX}, ${photo.translateY})`,
              }}
            >
              <img
                src={photo.src}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxWidth: "none",
                  pointerEvents: "none",
                  userSelect: "none",
                  display: "block",
                }}
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
