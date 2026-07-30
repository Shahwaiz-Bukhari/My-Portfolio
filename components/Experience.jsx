"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { timeline } from "@/lib/data";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/animations";

export default function Experience() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      // Vertical line draw.
      gsap.from(".timeline__line", {
        scaleY: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".timeline", start: "top 75%", once: true },
      });

      // Timeline entries reveal one by one.
      gsap.from(".timeline__item", {
        opacity: 0,
        y: 36,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: ".timeline", start: "top 75%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="experience" id="experience" ref={rootRef}>
      <div className="container">
        <div className="experience__panel">
          <div className="experience__intro">
            <span className="eyebrow">experience</span>
            <h2>The path so far</h2>
            <p>
              A short timeline of where I&apos;ve worked and studied — from computer
              science fundamentals to shipping production front-ends.
            </p>
          </div>

          <ol className="timeline">
            <span className="timeline__line" aria-hidden="true" />
            {timeline.map((item) => (
              <li className="timeline__item" key={item.id}>
                <span className="timeline__node" aria-hidden="true" />
                <span className="timeline__date">{item.date}</span>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__body">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
