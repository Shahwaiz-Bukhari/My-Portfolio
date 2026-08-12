"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/useGSAP";
import { terminalLines } from "@/lib/data";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/animations";

export default function Contact() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      // Terminal window reveal.
      gsap.from(".terminal", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".terminal", start: "top 82%", once: true },
      });

      // CLI lines appear with a subtle, quick stagger.
      gsap.from(".terminal__line", {
        opacity: 0,
        y: 10,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".terminal", start: "top 78%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="section contact" id="contact" ref={rootRef}>
      <div className="container">
        <span className="eyebrow">contact</span>
        <h2 className="section-title">Let&apos;s build something</h2>
        <p className="contact__lead">
          Open to front-end roles and freelance work. Run the commands below to reach
          me — every link is real and clickable.
        </p>

        <div className="terminal">
          <div className="terminal__bar">
            <div className="chrome-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="terminal__title">shahwaiz@portfolio: ~/contact</span>
          </div>

          <div className="terminal__body">
            {terminalLines.map((line, i) => {
              if (line.type === "cmd") {
                return (
                  <span key={i} className="terminal__line terminal__cmd">
                    {line.text}
                  </span>
                );
              }
              if (line.type === "link") {
                return (
                  <span key={i} className="terminal__line terminal__out">
                    <a
                      className="terminal__link"
                      href={line.href}
                      {...(line.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {line.text}
                    </a>
                  </span>
                );
              }
              return (
                <span key={i} className="terminal__line terminal__out">
                  {line.text}
                </span>
              );
            })}
            <span className="terminal__line terminal__cmd">
              <span className="terminal__caret" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
