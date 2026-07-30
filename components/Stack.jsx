"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { stack } from "@/lib/data";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/animations";

// Cycle chip backgrounds across the accent palette.
const chipColors = ["var(--lime)", "var(--sky)", "var(--coral)", "var(--lilac)", "var(--white)"];
// Sky and coral are dark-on-light readable; keep white text on the deeper hues.
const lightText = new Set(["var(--sky)", "var(--coral)", "var(--lilac)"]);

export default function Stack() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.from(".chip", {
        opacity: 0,
        y: 30,
        scale: 0.85,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.06,
        scrollTrigger: { trigger: ".stack__chips", start: "top 82%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="section stack" id="stack" ref={rootRef}>
      <div className="container">
        <span className="eyebrow">toolkit</span>
        <h2 className="section-title">The stack I reach for</h2>
        <p className="stack__lead">
          The languages, frameworks, and tools I use to build and animate fast,
          responsive interfaces.
        </p>

        <div className="stack__chips">
          {stack.map((skill, i) => {
            const bg = chipColors[i % chipColors.length];
            return (
              <span
                key={skill}
                className="chip"
                style={{
                  background: bg,
                  color: lightText.has(bg) ? "var(--white)" : "var(--ink)",
                }}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
