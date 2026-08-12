"use client";

import { useRef, useState, useEffect } from "react";
import { prefersReducedMotion, isTouchDevice } from "@/lib/animations";

// Strips protocol/trailing slash for a clean chrome-bar URL.
function prettyUrl(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  // ---- Intersection Observer: mount iframe only when card is near viewport ----
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only need to trigger once
        }
      },
      { rootMargin: "200px" } // start loading slightly before card is visible
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // ---- Magnetic 3D tilt from pointer position (desktop + motion only) ----
  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card || isTouchDevice() || prefersReducedMotion()) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  return (
    <article
      className="card project-card"
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Browser chrome with live URL */}
      <div className="card__chrome">
        <div className="chrome-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="card__url">{prettyUrl(project.url)}</span>
      </div>

      {/* Live preview: gradient fallback behind a scaled, lazy iframe thumbnail */}
      <div className="card__preview">
        <div
          className="card__fallback"
          style={{
            background: `linear-gradient(135deg, ${project.accent}, var(--ink))`,
          }}
        />
        {inView && (
          <div className="card__iframe-wrap">
            <iframe
              className="card__iframe"
              src={project.url}
              title={`${project.title} live preview`}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        )}
        <span className="card__badge">
          <span className="live-dot" />
          live
        </span>
        <span className="card__note">preview may be blocked — visit live site</span>
      </div>

      {/* Card body */}
      <div className="card__body">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__desc">{project.description}</p>

        <div className="card__tags">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <a
          className="card__link"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit site ↗
        </a>
      </div>
    </article>
  );
}

