"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
}

interface DotTreeProps {
  dots: Dot[];
  canvasSize: number;
  width: number;
  height: number;
  colors: string[];
  dotSize?: number;
  className?: string;
  verticalAlign?: "center" | "bottom";
}

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  color: string;
}

export default function DotTree({
  dots,
  canvasSize,
  width,
  height,
  colors,
  dotSize = 3,
  className = "",
  verticalAlign = "center",
}: DotTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dots.length) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const minX = Math.min(...dots.map((d) => d.x));
    const maxX = Math.max(...dots.map((d) => d.x));
    const minY = Math.min(...dots.map((d) => d.y));
    const maxY = Math.max(...dots.map((d) => d.y));
    const srcW = maxX - minX;
    const srcH = maxY - minY;

    const scale = Math.min(width / srcW, height / srcH) * 0.95;
    const scaledW = srcW * scale;
    const scaledH = srcH * scale;
    const offsetX = (width - scaledW) / 2;
    const offsetY = verticalAlign === "bottom" ? height - scaledH : (height - scaledH) / 2;
    const ds = dotSize * scale / (canvasSize / 560);

    const PUSH_RADIUS = 15;
    const PUSH_STRENGTH = 18;

    const baseDots = dots.map((dot) => {
      const bx = (dot.x - minX) * scale + offsetX;
      const by = (dot.y - minY) * scale + offsetY;
      const t = (dot.y - minY) / srcH;
      const colorIdx = Math.min(Math.floor(t * colors.length), colors.length - 1);
      return { bx, by, color: colors[colorIdx] };
    });

    const offsets = new Float32Array(baseDots.length * 2);
    const windOffsets = new Float32Array(baseDots.length);
    let windTime = 0;

    // Leaves
    const leaves: Leaf[] = [];
    let leafTimer = 0;

    function spawnLeaf() {
      // Pick a random dot near the top 60% of the tree as spawn point
      const idx = Math.floor(Math.random() * baseDots.length);
      const { bx, by, color } = baseDots[idx];
      // Only spawn from upper portion of tree
      if (by > height * 0.75) return;
      leaves.push({
        x: bx,
        y: by,
        vx: -(0.4 + Math.random() * 0.6), // drift left
        vy: 0.5 + Math.random() * 0.5,     // fall down
        size: 2 + Math.random() * 2,
        opacity: 0.7 + Math.random() * 0.3,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        color,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      // Draw tree dots
      for (let i = 0; i < baseDots.length; i++) {
        const { bx, by, color } = baseDots[i];
        let ox = offsets[i * 2];
        let oy = offsets[i * 2 + 1];

        if (mouse) {
          const dx = (bx + ox) - mouse.x;
          const dy = (by + oy) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PUSH_RADIUS && dist > 0) {
            const force = (1 - dist / PUSH_RADIUS) * PUSH_STRENGTH;
            ox += (dx / dist) * force;
            oy += (dy / dist) * force;
          }
        }

        ox *= 0.88;
        oy *= 0.88;
        offsets[i * 2] = ox;
        offsets[i * 2 + 1] = oy;

        ctx!.fillStyle = color;
        ctx!.fillRect(bx + ox + windOffsets[i], by + oy, ds, ds);
      }

      // Wind
      windTime += 0.012;
      for (let i = 0; i < baseDots.length; i++) {
        const { by } = baseDots[i];
        windOffsets[i] = Math.sin(windTime + by * 0.02) * 3.5;
      }

      // Spawn leaves periodically
      leafTimer++;
      if (leafTimer % 40 === 0) spawnLeaf();

      // Update & draw leaves
      for (let li = leaves.length - 1; li >= 0; li--) {
        const lf = leaves[li];
        lf.wobble += lf.wobbleSpeed;
        lf.x += lf.vx + Math.sin(lf.wobble) * 0.4;
        lf.y += lf.vy;
        // Fade as it approaches bottom
        const fadeStart = height * 0.7;
        if (lf.y > fadeStart) {
          lf.opacity -= 0.015;
        }
        if (lf.opacity <= 0 || lf.y > height + 10) {
          leaves.splice(li, 1);
          continue;
        }
        ctx!.globalAlpha = lf.opacity;
        ctx!.fillStyle = lf.color;
        ctx!.fillRect(lf.x, lf.y, lf.size, lf.size);
        ctx!.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = null; };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [dots, canvasSize, width, height, colors, dotSize, verticalAlign]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width, height }}
    />
  );
}
