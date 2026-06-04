import type { Metadata } from "next";
import ViewportScale from "@/components/ViewportScale";
import SectionSnap from "@/components/SectionSnap";
import "./globals.css";

const SITE_URL = "https://forge.mograph.life/apps/lerp";
const SITE_ROOT = `${SITE_URL}/`;
const COURSE_URL = `${SITE_URL}/getting-started/welcome`;
const OG_IMAGE = `${SITE_URL}/og-image_sm.png`;

export const metadata: Metadata = {
  title: "LERP — Luau Education for Rive Professionals",
  description:
    "The first interactive Luau scripting course for Rive. 90 docs pages, 222 exercises, 203 quizzes across 8 parts. Free forever, MIT licensed, no account required.",
  metadataBase: new URL(SITE_ROOT),
  alternates: {
    canonical: SITE_ROOT,
  },
  keywords: [
    "Rive",
    "Luau",
    "Rive scripting",
    "Rive Luau",
    "animation scripting",
    "interactive animation",
    "Rive course",
    "Rive tutorial",
    "Luau programming",
    "motion design scripting",
    "Rive Editor",
    "Rive protocols",
    "Rive API",
    "learn Rive",
    "Rive education",
  ],
  openGraph: {
    title: "LERP — Luau Education for Rive Professionals",
    description:
      "The first interactive Luau scripting course for Rive. 90 docs pages, 222 exercises, 203 quizzes. Free forever, MIT licensed.",
    url: SITE_ROOT,
    siteName: "LERP",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 600,
        alt: "LERP — Luau Education for Rive Professionals. 90 docs pages, 222 exercises, 203 quizzes.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LERP — Luau Education for Rive Professionals",
    description:
      "The first interactive Luau scripting course for Rive. 90 docs pages, 222 exercises, 203 quizzes. Free forever.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 600,
        alt: "LERP — Luau Education for Rive Professionals",
      },
    ],
  },
  icons: {
    icon: [
      { url: `${SITE_ROOT}favicon.ico`, sizes: "any" },
      { url: `${SITE_ROOT}favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${SITE_ROOT}favicon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: `${SITE_ROOT}apple-touch-icon.png`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as unknown as undefined,
    "max-snippet": -1 as unknown as undefined,
    "max-video-preview": -1 as unknown as undefined,
  },
  other: {
    "article:author": "Ilya Gusinski",
    "article:publisher": "IVG Design",
  },
};

/* ── JSON-LD Structured Data ────────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ── WebSite ── */
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "LERP",
      alternateName: [
        "Luau Education for Rive Professionals",
        "Learn Rive Scripting",
        "LERP Course",
      ],
      url: `${SITE_URL}/`,
      description:
        "The first interactive course built specifically for Rive's Luau scripting runtime. From fundamentals to advanced protocols.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },

    /* ── WebPage (landing page) ── */
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "LERP — Luau Education for Rive Professionals",
      description:
        "The first interactive Luau scripting course for Rive. 90 docs pages, 222 exercises, 203 quizzes across 8 parts. Free forever, MIT licensed, no account required.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#course` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 600,
      },
      inLanguage: "en",
      datePublished: "2026-03-10",
      dateModified: "2026-03-11",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          ".wave-h2",
          ".wave-desc",
          ".cta-content",
          ".faq-summary",
          ".faq-answer-inner",
        ],
      },
    },

    /* ── Course (comprehensive) ── */
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course`,
      name: "LERP: Luau Education for Rive Professionals",
      alternateName: "LERP",
      description:
        "The first interactive course built specifically for Rive's Luau scripting runtime. LERP takes you from absolute beginner to confident Rive scripter through 90 docs pages, 222 hands-on exercises, and 203 quizzes — all inside the Rive Editor. Covers Luau fundamentals, type system, OOP patterns, Rive protocols, Drawing API, ViewModels, procedural animation, physics, early-access GPU shaders, and guided projects.",
      url: COURSE_URL,
      provider: { "@id": `${SITE_URL}/#organization` },
      creator: { "@id": `${SITE_URL}/#author` },
      maintainer: { "@id": `${SITE_URL}/#author` },
      inLanguage: "en",
      isAccessibleForFree: true,
      license: "https://opensource.org/licenses/MIT",
      conditionsOfAccess: "No account required. No tracking. Progress stored in localStorage only.",
      educationalLevel: ["Beginner", "Intermediate", "Advanced"],
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: [
          "Motion designers using Rive",
          "Technical artists and animators",
          "Developers building interactive Rive experiences",
          "Teams standardizing Rive scripting patterns",
        ],
      },
      teaches: [
        "Luau programming language fundamentals",
        "Rive Luau scripting runtime",
        "Variables, data types, operators, control flow",
        "Functions, tables, and iteration in Luau",
        "Luau type system with strict mode and generics",
        "Object-oriented programming with metatables",
        "Classes, inheritance, and encapsulation in Luau",
        "Rive scripting environment and script types",
        "Rive Node Protocol and lifecycle hooks",
        "Rive Layout Protocol",
        "Rive Converter Protocol",
        "Rive Path Effect Protocol",
        "Rive Listener Protocol and actions",
        "Rive Transition Condition Protocol",
        "Core types (Vec2, Mat2D, AABB, Color)",
        "Rive Drawing API (Path, Paint, Renderer)",
        "ViewModel data binding",
        "Procedural animation and physics",
        "Game logic and hit detection",
        "Dynamic instantiation",
        "Architecture and performance best practices",
        "Debugging Rive scripts",
        "Production-ready scripting patterns",
      ],
      coursePrerequisites:
        "Familiarity with Rive's visual editor. No programming experience required. JavaScript, After Effects, or Unity experience helps — LERP includes comparison tables to map existing knowledge.",
      timeRequired: "P6W",
      typicalAgeRange: "16-",
      numberOfCredits: 0,
      occupationalCredentialAwarded: "None — self-paced, open-source education",
      financialAidEligible: "Not applicable — course is free",
      totalHistoricalEnrollment: undefined,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: COURSE_URL,
        category: "Free",
        validFrom: "2026-03-10",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        name: "LERP Self-Paced Online Course",
        courseMode: "Online",
        courseSchedule: {
          "@type": "Schedule",
          repeatFrequency: "P1D",
          repeatCount: 42,
          duration: "PT30M",
        },
        courseWorkload: "PT2H",
        instructor: { "@id": `${SITE_URL}/#author` },
        location: {
          "@type": "VirtualLocation",
          url: COURSE_URL,
        },
      },
      hasPart: [
        {
          "@type": "Course",
          name: "Part 1: Getting Started",
          description:
            "Welcome to Rive Scripting. Why Luau was chosen, your first script, and how Rive scripts work.",
          url: `${SITE_URL}/getting-started/welcome`,
          numberOfLessons: 4,
          educationalLevel: "Beginner",
          teaches: [
            "Rive scripting overview",
            "Why Luau for Rive",
            "Writing your first Rive script",
            "How Rive scripts execute",
          ],
        },
        {
          "@type": "Course",
          name: "Part 2: Luau Fundamentals",
          description:
            "Core language mechanics — variables, data types, operators, control flow, functions, tables, and iteration.",
          url: `${SITE_URL}/fundamentals/variables`,
          numberOfLessons: 7,
          educationalLevel: "Beginner",
          teaches: [
            "Variables and scoping",
            "Data types",
            "Operators",
            "Control flow",
            "Functions",
            "Tables",
            "Iteration and loops",
          ],
        },
        {
          "@type": "Course",
          name: "Part 3: Type System",
          description:
            "Luau's gradual type system — annotations, strict mode, custom types, advanced types, generics, and late initialization.",
          url: `${SITE_URL}/types/intro`,
          numberOfLessons: 7,
          educationalLevel: "Intermediate",
          teaches: [
            "Type annotations",
            "Strict mode",
            "Custom type definitions",
            "Advanced type patterns",
            "Generics",
            "Late initialization",
          ],
        },
        {
          "@type": "Course",
          name: "Part 4: OOP Deep Dive",
          description:
            "Object-oriented programming in Luau — prototypes, metatables, __index, classes, self, inheritance, encapsulation, and design patterns.",
          url: `${SITE_URL}/oop/prototype-based`,
          numberOfLessons: 8,
          educationalLevel: "Intermediate",
          teaches: [
            "Prototype-based OOP",
            "Metatables",
            "__index metamethod",
            "Class construction",
            "self and methods",
            "Inheritance chains",
            "Encapsulation patterns",
            "OOP design patterns",
          ],
        },
        {
          "@type": "Course",
          name: "Part 5: Rive Integration",
          description:
            "Rive scripting environment, script types, capability matrix, inputs, AI agent, and protocol lessons for Node, Layout, Converter, Path Effect, ListenerAction, TransitionCondition, ScriptedInterpolator, Util, and Test scripts.",
          url: `${SITE_URL}/rive/environment`,
          numberOfLessons: 15,
          educationalLevel: "Intermediate",
          teaches: [
            "Rive scripting environment",
            "Script types and capabilities",
            "Rive inputs system",
            "Node Protocol",
            "Node Lifecycle hooks",
            "Layout Protocol",
            "Converter Protocol",
            "Path Effect Protocol",
            "ListenerAction Protocol",
            "Listener Protocol",
            "Transition Condition Protocol",
            "ScriptedInterpolator Protocol",
            "Util Protocol",
            "Test Protocol",
          ],
        },
        {
          "@type": "Course",
          name: "Part 6: Advanced Rive Scripting",
          description:
            "Core types (Vec2, Mat2D, AABB, Color), Drawing API, ViewModels, Listener Protocol, game logic, instantiation, procedural animation, and early-access GPU shaders.",
          url: `${SITE_URL}/advanced/core-types`,
          numberOfLessons: 8,
          educationalLevel: "Advanced",
          teaches: [
            "Core types (Vec2, Mat2D, AABB, Color)",
            "Drawing API (Path, Paint, Renderer)",
            "ViewModel data binding",
            "Game logic and hit detection",
            "Dynamic instantiation",
            "Procedural animation",
            "Early-access GPU shaders and GPUCanvas rendering",
          ],
        },
        {
          "@type": "Course",
          name: "Part 7: Best Practices",
          description:
            "Architecture patterns, performance optimization, debugging techniques, and production resources for Rive scripting.",
          url: `${SITE_URL}/best-practices/architecture`,
          numberOfLessons: 4,
          educationalLevel: "Advanced",
          teaches: [
            "Script architecture",
            "Performance optimization",
            "Debugging techniques",
            "Production resources",
          ],
        },
        {
          "@type": "Course",
          name: "Part 8: Projects and Labs",
          description:
            "Production-grade builds and guided labs: interactive button with hit detection, data-driven chart with ViewModels, star-catching mini-game with physics, and GPU shader example labs.",
          url: `${SITE_URL}/projects/interactive-button`,
          numberOfLessons: 4,
          educationalLevel: "Advanced",
          teaches: [
            "Interactive button with hit detection",
            "Data-driven chart with ViewModels",
            "Star-catching mini-game with physics",
            "GPU shader labs with textures, post-processing, depth, and ray marching",
          ],
        },
      ],
      aggregateRating: undefined,
      review: undefined,
      about: [
        {
          "@type": "Thing",
          name: "Rive",
          url: "https://rive.app",
          description:
            "Real-time interactive design and animation tool for apps, games, and websites.",
        },
        {
          "@type": "ComputerLanguage",
          name: "Luau",
          url: "https://luau.org",
          description:
            "A fast, small, safe, gradually typed embeddable scripting language derived from Lua, created by Roblox.",
        },
      ],
      sourceOrganization: { "@id": `${SITE_URL}/#organization` },
      image: OG_IMAGE,
    },

    /* ── Organization ── */
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "IVG Design",
      url: "https://mograph.life",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/lerp_logo_mark.svg`,
      },
      sameAs: [
        "https://forge.mograph.life",
        "https://github.com/ivg-design",
        "https://www.linkedin.com/in/ivgd",
        "https://contra.com/ivg_design",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "mailto:ilya@gusinski.us",
        availableLanguage: ["English"],
      },
    },

    /* ── Author ── */
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Ilya Gusinski",
      alternateName: "I.V. Gusinski",
      jobTitle: "Motion Designer & Interactive Animation Engineer",
      description:
        "Creator of LERP, the first interactive Luau scripting course for Rive. Specializes in motion design, interactive animation engineering, and technical education.",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: "https://mograph.life",
      sameAs: [
        "https://github.com/ivg-design",
        "https://www.linkedin.com/in/ivgd",
        "https://contra.com/ivg_design",
        "https://www.upwork.com/freelancers/ivgd",
      ],
      knowsAbout: [
        "Rive animation",
        "Luau programming",
        "Motion design",
        "Interactive animation",
        "Technical education",
      ],
    },

    /* ── FAQPage ── */
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need programming experience?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Part 01 starts from zero. If you can use Rive\u2019s visual editor, you can learn scripting. JavaScript, After Effects, or Unity experience helps \u2014 LERP includes comparison tables so you can map what you already know.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as learning Luau?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Partially. LERP teaches Luau fundamentals, but everything is taught through Rive\u2019s scripting context \u2014 protocols, nodes, animation APIs. It\u2019s Luau for Rive, not Luau in general.",
          },
        },
        {
          "@type": "Question",
          name: "How much does LERP cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "$0. Forever. MIT licensed. No paywalls, no premium tiers, no accounts required.",
          },
        },
        {
          "@type": "Question",
          name: "What tools do I need for LERP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Just the Rive Editor (free). All exercises run inside Rive. No IDE, terminal, or build tools needed.",
          },
        },
        {
          "@type": "Question",
          name: "How long does the full LERP course take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At 1\u20132 lessons per day, most learners complete all 8 parts in 6\u20138 weeks. Each lesson is self-contained, so you can go at your own pace. The larger projects and shader labs take a few hours each.",
          },
        },
        {
          "@type": "Question",
          name: "How is my progress tracked?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LocalStorage only. No accounts, no server, no telemetry. You own your data. Progress, preferences, quiz scores \u2014 all on your device. Export anytime via JSON.",
          },
        },
        {
          "@type": "Question",
          name: "Does LERP cover runtime integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "LERP focuses on scripting inside the Rive Editor. Runtime integration (iOS, Android, Web, Flutter) is covered in Rive\u2019s official runtime docs. However, every script you write in LERP is production-ready and works identically in any runtime.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between Rive scripts and state machines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "State machines handle visual state transitions and blend trees. Scripts add procedural logic, data binding, physics, and custom drawing that state machines can\u2019t express. LERP teaches you how to use both together effectively.",
          },
        },
        {
          "@type": "Question",
          name: "Can I contribute to LERP or report errors?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. LERP is open-source on GitHub. File issues, submit corrections, or contribute lessons via pull requests.",
          },
        },
      ],
    },

    /* ── Curriculum ItemList (for rich snippets) ── */
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#curriculum`,
      name: "LERP Course Curriculum",
      description:
        "Eight-part curriculum covering Luau fundamentals through advanced Rive scripting, guided projects, and early-access shader labs.",
      numberOfItems: 8,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Getting Started",
          description: "Welcome to Rive Scripting — your first script and how Rive scripts work",
          url: `${SITE_URL}/getting-started/welcome`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Luau Fundamentals",
          description: "Variables, data types, operators, control flow, functions, tables, iteration",
          url: `${SITE_URL}/fundamentals/variables`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Type System",
          description: "Annotations, strict mode, custom types, generics, late initialization",
          url: `${SITE_URL}/types/intro`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "OOP Deep Dive",
          description: "Prototypes, metatables, classes, inheritance, encapsulation, patterns",
          url: `${SITE_URL}/oop/prototype-based`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Rive Integration",
          description: "Scripting environment, protocol lessons, inputs, AI agent",
          url: `${SITE_URL}/rive/environment`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Advanced Rive Scripting",
          description: "Core types, Drawing API, ViewModels, game logic, procedural animation, GPU shaders",
          url: `${SITE_URL}/advanced/core-types`,
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Best Practices",
          description: "Architecture, performance, debugging, production resources",
          url: `${SITE_URL}/best-practices/architecture`,
        },
        {
          "@type": "ListItem",
          position: 8,
          name: "Projects and Labs",
          description: "Interactive button, data-driven chart, star-catching mini-game, GPU shader labs",
          url: `${SITE_URL}/projects/interactive-button`,
        },
      ],
    },

    /* ── BreadcrumbList ── */
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Forge",
          item: "https://forge.mograph.life",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "LERP",
          item: `${SITE_URL}/`,
        },
      ],
    },
  ],
};

/* ── Remove undefined values for clean JSON output ── */
function cleanUndefined(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(cleanUndefined);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, cleanUndefined(v)])
    );
  }
  return obj;
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(cleanUndefined(jsonLd)),
          }}
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
