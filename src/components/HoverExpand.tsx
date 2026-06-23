"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ImageItem {
  src: string;
  alt: string;
}

export default function HoverExpand({ images }: { images: ImageItem[] }) {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const expandedWidth = isMobile ? 140 : 260;
  const collapsedWidth = isMobile ? 20 : 44;
  const height = isMobile ? 220 : 350;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 4, width: "100%", alignItems: "center" }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            style={{ position: "relative", cursor: "pointer", overflow: "hidden", borderRadius: 16, flexShrink: 0 }}
            animate={{
              width: activeImage === index ? expandedWidth : collapsedWidth,
              height,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
                    zIndex: 1,
                  }}
                />
              )}
            </AnimatePresence>
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: `hsl(${210 + index * 15}, 40%, ${80 - index * 4}%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", writingMode: "vertical-rl" }}>
                  {index + 1}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
