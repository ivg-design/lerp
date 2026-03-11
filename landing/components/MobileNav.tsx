"use client";

import { useState, useEffect, useRef } from "react";
import CourseCtaText from "./CourseCtaText";

const LINKS = [
  { href: "#why", label: "why lerp", color: "var(--brand-yellow)" },
  { href: "#code", label: "scripting", color: "var(--brand-lime)" },
  { href: "#curriculum", label: "curriculum", color: "var(--brand-cyan)" },
  { href: "#faq", label: "faq", color: "var(--brand-purple)" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on anchor click (after scroll starts)
  function handleLinkClick() {
    setOpen(false);
  }

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className={`hamburger ${open ? "hamburger-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span className="hamburger-line hamburger-top" />
        <span className="hamburger-line hamburger-mid" />
        <span className="hamburger-line hamburger-bot" />
      </button>

      {/* Backdrop */}
      <div
        className={`nav-backdrop ${open ? "nav-backdrop-visible" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`nav-drawer ${open ? "nav-drawer-open" : ""}`}
      >
        <div className="nav-drawer-links">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-drawer-link"
              style={{
                "--link-color": link.color,
                "--link-delay": `${i * 60 + 80}ms`,
              } as React.CSSProperties}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="/apps/lerp/getting-started/welcome"
          className="nav-drawer-cta"
          onClick={handleLinkClick}
        >
          <CourseCtaText startText="start learning" continueText="continue course" />
        </a>
      </div>
    </>
  );
}
