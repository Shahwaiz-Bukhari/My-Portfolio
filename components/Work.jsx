"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/animations";

export default function Work() {
  const rootRef = useRef(null);

  // Staggered scroll reveal for the project cards.
  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.from(".project-card", {
        opacity: 0,
        y: 60,
        rotate: -2,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".work__grid",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="section work" id="work" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">selected work</span>
          <h2 className="section-title">Things I&apos;ve shipped</h2>
        </div>

        <div className="work__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
