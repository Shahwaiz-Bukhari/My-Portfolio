"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/animations";

// Lenis smooth scrolling, synced with GSAP ScrollTrigger.
export default function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    // Respect reduced-motion: skip Lenis entirely, fall back to native scroll.
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync on every Lenis scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for a single, stable RAF loop.
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth-scroll anchor links to their target sections.
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    };
    document.addEventListener("click", handleAnchorClick);

    // Refresh once layout + fonts settle.
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    window.addEventListener("load", ScrollTrigger.refresh);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", ScrollTrigger.refresh);
      window.clearTimeout(refreshId);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
