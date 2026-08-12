// All personal, skill, experience, and project content lives here.
// Components import from this file — never hardcode repeated content in components.

export const person = {
  name: "Syed Shahwaiz Ali Bukhari",
  displayName: "Shahwaiz Ali",
  role: "Front-End Engineer — React.js / Next.js",
  location: "Lahore, Pakistan — open to remote",
  email: "shahwaiz.ali78@gmail.com",
  phone: "+92 321 1882557",
  linkedin: "https://www.linkedin.com/in/syed-shahwaiz-ali-09a9ab264/",
  logo: "shahwaiz.dev",
  // 2-sentence subhead, rewritten from the bio only for readability — no invented facts.
  subhead:
    "I'm a front-end engineer building production web apps with React and Next.js, animated with GSAP. Currently at Bricksol in Lahore, I ship responsive, client-centric interfaces for real estate, corporate, and business platforms using React/Next.js, Material UI, and GSAP.",
};

// Navigation links — ids must match section ids on the page.
export const navLinks = [
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "stack", href: "#stack" },
  { label: "contact", href: "#contact" },
];

// Floating hero stickers — code-flavored text chips.
export const stickers = [
  { id: "s1", text: "GSAP timeline ▶", x: "6%", y: "14%", rotate: -7 },
  { id: "s2", text: "Next.js", x: "78%", y: "8%", rotate: 6 },
  { id: "s3", text: "npm run build", x: "70%", y: "62%", rotate: -5 },
  { id: "s4", text: "React component", x: "3%", y: "64%", rotate: 8 },
  { id: "s5", text: "API connected", x: "84%", y: "40%", rotate: -9 },
  { id: "s6", text: "pixel perfect", x: "58%", y: "88%", rotate: 5 },
];

// Six real projects — names, descriptions, stacks and live links are fixed.
export const projects = [
  {
    id: "p1",
    title: "Saudisol — Real Estate Platform",
    description:
      "Immersive 3D property experiences and virtual tours with a high-performance responsive front end.",
    stack: ["React.js", "Vite", "GSAP", "MUI"],
    url: "https://saudisol.vercel.app/",
    accent: "var(--coral)",
  },
  {
    id: "p2",
    title: "Bricksol — Corporate Platform",
    description: "Fully responsive corporate site with custom 3D design components.",
    stack: ["Next.js", "Three.js", "GSAP", "MUI"],
    url: "https://bricksol.net/",
    accent: "var(--sky)",
  },
  {
    id: "p3",
    title: "Bricksol - Company Portfolio",
    description: "Clean responsive company portfolio site with optimized interactions.",
    stack: ["Next.js", "MUI", "CSS3"],
    url: "https://bricksol03.vercel.app/",
    accent: "var(--lilac)",
  },
  {
    id: "p4",
    title: "DataSynex - Corporate Platform",
    description: "Responsive software company site with engaging UI.",
    stack: ["Next.js", "GSAP", "MUI"],
    url: "https://datasynexcloud.com/",
    accent: "var(--lime)",
  },
  {
    id: "p5",
    title: "Alawaly — Real Estate Platform",
    description:
      "Modern responsive business site with smooth navigation and interactive service sections.",
    stack: ["Next.js", "GSAP", "MUI"],
    url: "https://alawaly-web1.vercel.app/",
    accent: "var(--sky)",
  },
];

// Experience / education timeline — 3 entries.
export const timeline = [
  {
    id: "t1",
    date: "Apr 2025 — Present",
    title: "Front-End Engineer — Bricksol, Lahore",
    body: "Building responsive client-centric apps for real estate, corporate, and business platforms using React/Next.js, Material UI, and GSAP.",
  },
  {
    id: "t2",
    date: "May 2024 — Jul 2024",
    title: "PHP/MySQL Bootcamp — Eezo",
    body: "Completed practical training in PHP, MySQL, backend fundamentals, database-driven applications, and web development workflows.",
  },
  {
    id: "t3",
    date: "2020 — 2024",
    title: "BS Computer Science — University of Sahiwal",
    body: "Studied core computer science with focus on Data Structures, Algorithms, OOP, and Algorithm Design.",
  },
];

// Skills shown as chips.
export const stack = [
  "React.js",
  "Next.js",
  "JavaScript ES6",
  "GSAP",
  "Material UI",
  "HTML5/CSS3",
  "PHP",
  "MySQL",
  "REST APIs",
  "Node.js",
  "Git",
  "OOP & DSA",
];

// Simulated CLI session for the contact terminal.
export const terminalLines = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "Shahwaiz Ali — Front-End Engineer" },
  { type: "cmd", text: "contact --email" },
  { type: "link", text: person.email, href: `mailto:${person.email}` },
  { type: "cmd", text: "contact --phone" },
  { type: "link", text: person.phone, href: `tel:${person.phone.replace(/\s+/g, "")}` },
  { type: "cmd", text: "contact --elsewhere" },
  {
    type: "link",
    text: `LinkedIn: ${person.linkedin}`,
    href: person.linkedin,
    external: true,
  },
];
