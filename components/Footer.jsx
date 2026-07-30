import { person } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {year} {person.displayName}. Built with Next.js + GSAP.
        </span>
        <nav className="footer__links" aria-label="Social">
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={`mailto:${person.email}`}>Email ↗</a>
        </nav>
      </div>
    </footer>
  );
}
