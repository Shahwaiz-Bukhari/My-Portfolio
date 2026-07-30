"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";

// Coral cursor dot that follows the pointer and grows to lime over interactive elements.
// Desktop + fine-pointer only. Disabled for touch and reduced-motion users.
export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || prefersReducedMotion()) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let rafId;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    // Grow + turn lime over interactive elements.
    const interactiveSelector =
      'a, button, .card, .chip, .sticker, .terminal__link, [role="button"]';
    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.add("cursor-dot--active");
      }
    };
    const onOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.remove("cursor-dot--active");
      }
    };

    // Smooth follow loop.
    const render = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
