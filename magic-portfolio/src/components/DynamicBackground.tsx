"use client";

import React, { useEffect, useRef } from "react";

export default function DynamicBackground(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;

    // target motion state
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;
    let targetCx = 0;
    let targetCy = 0;

    // displayed/smoothed values
    let mx = 0;
    let my = 0;
    let scroll = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      // background parallax smoothing (faster)
      const kBg = 0.25;
      // cursor spot smoothing (slower trailing)
      const kSpot = 0.08;

      mx += (targetX - mx) * kBg;
      my += (targetY - my) * kBg;
      scroll += (targetScroll - scroll) * kBg;
      cx += (targetCx - cx) * kSpot;
      cy += (targetCy - cy) * kSpot;

      el.style.setProperty("--mx", mx.toFixed(2));
      el.style.setProperty("--my", my.toFixed(2));
      el.style.setProperty("--scroll", scroll.toFixed(2));
      el.style.setProperty("--cx", cx.toFixed(2));
      el.style.setProperty("--cy", cy.toFixed(2));

      rafId = requestAnimationFrame(tick);
    };

    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = e.clientX / innerWidth - 0.5; // -0.5..0.5
      const ny = e.clientY / innerHeight - 0.5;

      targetX = nx * 40; // stronger parallax
      targetY = ny * 40;
      targetCx = e.clientX;
      targetCy = e.clientY;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY * 0.08; // stronger parallax
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // initialize state
    handleScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouse as any);
      window.removeEventListener("scroll", handleScroll as any);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="dynamic-bg" aria-hidden>
      <div className="dynamic-bg__orbs">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
      </div>
      <div className="cursor-spot" />
    </div>
  );
}
