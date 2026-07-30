import "./globals.css";

// Inline SVG favicon: rounded ink square with a lime </> mark.
const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="16" fill="#15131F"/>
      <text x="32" y="42" font-family="monospace" font-size="26" font-weight="700"
        text-anchor="middle" fill="#C8FF4D">&lt;/&gt;</text>
    </svg>`
  );

export const metadata = {
  title: "Shahwaiz Ali — Front-End Engineer",
  description:
    "Portfolio of Shahwaiz Ali, a Lahore-based Front-End Engineer building React and Next.js web apps with GSAP-powered interactions.",
  openGraph: {
    title: "Shahwaiz Ali — Front-End Engineer",
    description:
      "Portfolio of Shahwaiz Ali, a Lahore-based Front-End Engineer building React and Next.js web apps with GSAP-powered interactions.",
    type: "website",
    url: "https://shahwaiz.dev",
  },
  icons: {
    icon: favicon,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Display font — Bricolage Grotesque from Fontshare */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=bricolage-grotesque@700&display=swap"
        />
        {/* Body (Inter) + Mono (JetBrains Mono) from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
