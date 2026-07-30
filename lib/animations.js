// Reusable GSAP animation helpers.
// These run only on the client. Always guard for SSR and reduced motion.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

// Register GSAP plugins exactly once, on the client only.
export function registerGsap() {
  if (typeof window === "undefined") return;
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

// Returns true when the user prefers reduced motion.
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Returns true on touch / coarse-pointer devices.
export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

// Simple fade + rise reveal tied to a ScrollTrigger.
export function scrollReveal(targets, options = {}) {
  if (prefersReducedMotion()) return;
  registerGsap();
  return gsap.from(targets, {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: options.trigger || targets,
      start: options.start || "top 82%",
      once: true,
    },
    ...options.vars,
  });
}

// Staggered reveal for a group of elements, scroll-triggered.
export function staggerReveal(targets, options = {}) {
  if (prefersReducedMotion()) return;
  registerGsap();
  return gsap.from(targets, {
    opacity: 0,
    y: 50,
    rotate: options.rotate ?? -2,
    duration: 0.8,
    ease: "power3.out",
    stagger: options.stagger ?? 0.12,
    scrollTrigger: {
      trigger: options.trigger || targets,
      start: options.start || "top 80%",
      once: true,
    },
    ...options.vars,
  });
}

export { gsap, ScrollTrigger };
