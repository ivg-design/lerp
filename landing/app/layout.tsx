import type { Metadata } from "next";
import ViewportScale from "@/components/ViewportScale";
import SectionSnap from "@/components/SectionSnap";
import "./globals.css";

const SITE_URL = "https://forge.mograph.life/apps/lerp";

export const metadata: Metadata = {
  title: "LERP — Luau Education for Rive Professionals",
  description:
    "The interactive Luau scripting course for Rive. 77 lessons, 201 exercises, 189 quizzes. Free forever, MIT licensed.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "LERP — Luau Education for Rive Professionals",
    description:
      "The interactive Luau scripting course for Rive. 77 lessons, 201 exercises, 189 quizzes. Free forever, MIT licensed.",
    url: SITE_URL,
    siteName: "LERP",
    type: "website",
    images: [
      {
        url: "/lerp_banner.svg",
        width: 1200,
        height: 630,
        alt: "LERP — Luau Education for Rive Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LERP — Luau Education for Rive Professionals",
    description:
      "The interactive Luau scripting course for Rive. 77 lessons, 201 exercises, 189 quizzes. Free forever, MIT licensed.",
    images: ["/lerp_banner.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Nunito:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&family=Caveat:wght@700&family=Space+Grotesk:wght@700&family=Bebas+Neue&family=Cormorant+Garamond:wght@700&family=Righteous&family=Satisfy&family=Josefin+Sans:wght@700&family=Abril+Fatface&family=Architects+Daughter&family=Oswald:wght@700&family=Pacifico&family=Raleway:wght@800&family=Bitter:wght@800&family=Staatliches&family=Dancing+Script:wght@700&family=Inconsolata:wght@800&family=Lobster&family=Bangers&family=Amatic+SC:wght@700&family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ViewportScale />
        <SectionSnap />
        {children}
      </body>
    </html>
  );
}
