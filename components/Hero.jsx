"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { person, stickers } from "@/lib/data";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/animations";

// Hand-drawn squiggle underline for the word "human".
function Squiggle() {
  return (
    <span className="hero__squiggle">
      human
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M2 8 C 30 2, 50 12, 80 6 S 140 2, 170 8 S 196 6, 198 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef(null);
  const stickerRefs = useRef([]);

  // ---- Entrance animations (headline line-by-line, then sticker pop-in) ----
  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow + headline lines reveal with clip-path + translateY.
      tl.from(".hero__eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          ".hero__line > span",
          {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.2"
        )
        .from(".hero__subhead", { opacity: 0, y: 24, duration: 0.7 }, "-=0.3")
        .from(".hero__cta > *", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, "-=0.3")
        // Sticker pop-in: staggered scale + rotate.
        .from(
          stickerRefs.current,
          {
            scale: 0,
            rotate: 40,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.8)",
            stagger: 0.08,
          },
          "-=0.2"
        )
        .from(".hero__hint", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2");
    },
    { scope: rootRef }
  );

  // ---- Draggable stickers via Pointer Events ----
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cleanups = [];
      let topZ = 10;

      stickerRefs.current.forEach((el) => {
        if (!el) return;

        let startX = 0;
        let startY = 0;
        let baseX = 0;
        let baseY = 0;
        let dragging = false;

        const setter = gsap.quickSetter(el, "css");
        let curX = 0;
        let curY = 0;

        const onPointerDown = (e) => {
          dragging = true;
          el.setPointerCapture(e.pointerId);
          startX = e.clientX;
          startY = e.clientY;
          baseX = curX;
          baseY = curY;
          topZ += 1;
          el.style.zIndex = String(topZ); // bring to front while dragging
        };

        const onPointerMove = (e) => {
          if (!dragging) return;
          curX = baseX + (e.clientX - startX);
          curY = baseY + (e.clientY - startY);
          setter({ x: curX, y: curY });
        };

        const endDrag = (e) => {
          if (!dragging) return;
          dragging = false;
          try {
            el.releasePointerCapture(e.pointerId);
          } catch (_) {
            /* pointer may already be released */
          }
        };

        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("pointermove", onPointerMove);
        el.addEventListener("pointerup", endDrag);
        el.addEventListener("pointercancel", endDrag);

        cleanups.push(() => {
          el.removeEventListener("pointerdown", onPointerDown);
          el.removeEventListener("pointermove", onPointerMove);
          el.removeEventListener("pointerup", endDrag);
          el.removeEventListener("pointercancel", endDrag);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: rootRef }
  );

  return (
    <section className="hero" ref={rootRef}>
      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">
          <span className="hero__status-dot" />
          available for roles
        </span>

        <h1 className="hero__headline">
          <span className="hero__line">
            <span>I build interfaces</span>
          </span>
          <span className="hero__line">
            <span>that move, load fast,</span>
          </span>
          <span className="hero__line">
            <span>
              and still feel <Squiggle />
            </span>
          </span>
        </h1>

        <p className="hero__subhead">{person.subhead}</p>

        <div className="hero__cta">
          <a href="#work" className="btn btn--primary">
            see the work
          </a>
          <a href="#contact" className="btn">
            let&apos;s talk
          </a>
        </div>

        <span className="hero__hint">↗ drag those cards around</span>
      </div>

      {/* Decorative floating, draggable stickers */}
      <div className="sticker-layer" aria-hidden="true">
        {stickers.map((sticker, i) => (
          <div
            key={sticker.id}
            ref={(el) => (stickerRefs.current[i] = el)}
            className="sticker"
            style={{
              left: sticker.x,
              top: sticker.y,
              rotate: `${sticker.rotate}deg`,
            }}
          >
            <div className="sticker__bar">
              <div className="chrome-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="sticker__body">{sticker.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
