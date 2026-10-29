"use client";

import { useEffect, useRef } from "react";

type Line = {
  ax: number; // anchor
  ay: number;
  born: number;
  released: number | null;
  delay: number;
  hue: number; // base hue; shifts with stretch
};

const LINE_COUNT = 10;
const MIN_RADIUS = 60;
const MAX_RADIUS = 220;
const GROW_MS = 280;
const FADE_MS = 600;
const HUE_PER_PX = 0.5; // degrees of hue shift per pixel of stretch

export default function ClickLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lines: Line[] = [];
    const mouse = { x: 0, y: 0 };
    let dpr = 1;
    let raf = 0;
    let running = false;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        const age = now - l.born - l.delay;
        if (age < 0) continue;

        const grow = Math.min(1, age / GROW_MS);
        const eased = 1 - Math.pow(1 - grow, 3);

        let alpha = 0.55;
        if (l.released !== null) {
          const since = now - l.released;
          if (since >= FADE_MS) {
            lines.splice(i, 1);
            continue;
          }
          alpha *= 1 - since / FADE_MS;
        }

        // line is drawn from the anchor toward the cursor, growing in
        const x = l.ax + (mouse.x - l.ax) * eased;
        const y = l.ay + (mouse.y - l.ay) * eased;

        // ink colour drifts around the wheel the further the line is stretched
        const len = Math.hypot(x - l.ax, y - l.ay);
        const hue = (l.hue + len * HUE_PER_PX) % 360;
        const ink = `hsla(${hue}, 55%, 38%, ${alpha})`;

        ctx.strokeStyle = ink;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(l.ax, l.ay);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.arc(l.ax, l.ay, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (lines.length > 0) {
        raf = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const now = performance.now();
      for (let i = 0; i < LINE_COUNT; i++) {
        const angle = (i / LINE_COUNT) * Math.PI * 2 + Math.random() * 0.6;
        const r = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
        lines.push({
          ax: e.clientX + Math.cos(angle) * r,
          ay: e.clientY + Math.sin(angle) * r,
          born: now,
          released: null,
          delay: Math.random() * 90,
          hue: (i / LINE_COUNT) * 360 + Math.random() * 30,
        });
      }
      start();
    };

    const onUp = () => {
      const now = performance.now();
      for (const l of lines) if (l.released === null) l.released = now;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("blur", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
