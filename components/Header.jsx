"use client";

import { person, navLinks } from "@/lib/data";

// Fixed, blurred header with semantic nav and a pill CTA.
export default function Header() {
  const [name, dot] = person.logo.split(".");

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="logo" aria-label={`${person.logo} home`}>
          {name}
          <span className="logo__dot">.</span>
          {dot}
        </a>

        <nav className="header__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn header__cta">
          say hi →
        </a>
      </div>
    </header>
  );
}
