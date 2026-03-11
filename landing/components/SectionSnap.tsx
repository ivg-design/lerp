"use client";

import { useEffect } from "react";

const NAV_HEIGHT = 78;
const IDLE_DELAY = 1500;
const MIN_DURATION = 2400;
const MAX_DURATION = 6000;
const PX_PER_SEC = 200;

// Nav click scroll — much faster
const NAV_MIN_DURATION = 400;
const NAV_MAX_DURATION = 900;
const NAV_PX_PER_SEC = 1600;

export default function SectionSnap() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;
    let isSnapping = false;

    const sections = () =>
      document.querySelectorAll<HTMLElement>(
        ".hero, .why-lerp, .code-section, .curriculum, .faq-section, .final-cta"
      );

    function getMostVisible(): HTMLElement | null {
      const vh = window.innerHeight;
      let best: HTMLElement | null = null;
      let bestArea = 0;

      for (const sec of sections()) {
        const rect = sec.getBoundingClientRect();
        const visTop = Math.max(NAV_HEIGHT, rect.top);
        const visBot = Math.min(vh, rect.bottom);
        const visible = Math.max(0, visBot - visTop);

        if (visible > bestArea) {
          bestArea = visible;
          best = sec;
        }
      }
      return best;
    }

    // Get the block = [spectrum-line-above, section, spectrum-line-below]
    function getBlockRect(el: HTMLElement) {
      let top = el.getBoundingClientRect().top;
      let bottom = el.getBoundingClientRect().bottom;

      const prev = el.previousElementSibling;
      if (prev && prev.classList.contains("spectrum-line")) {
        top = prev.getBoundingClientRect().top;
      }
      const next = el.nextElementSibling;
      if (next && next.classList.contains("spectrum-line")) {
        bottom = next.getBoundingClientRect().bottom;
      }

      return { top, bottom, height: bottom - top };
    }

    function easeInOutQuart(t: number) {
      return t < 0.5
        ? 8 * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function smoothScrollTo(targetY: number, fast = false) {
      const startY = window.scrollY;
      const distance = Math.abs(targetY - startY);
      if (distance < 4) { isSnapping = false; return; }

      const minD = fast ? NAV_MIN_DURATION : MIN_DURATION;
      const maxD = fast ? NAV_MAX_DURATION : MAX_DURATION;
      const speed = fast ? NAV_PX_PER_SEC : PX_PER_SEC;
      const duration = Math.min(maxD, Math.max(minD, (distance / speed) * 1000));
      const startTime = performance.now();

      document.documentElement.style.scrollBehavior = "auto";

      function step(now: number) {
        if (!isSnapping) {
          document.documentElement.style.scrollBehavior = "";
          return;
        }
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOutQuart(progress);

        window.scrollTo(0, startY + (targetY - startY) * eased);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          isSnapping = false;
          document.documentElement.style.scrollBehavior = "";
        }
      }

      rafId = requestAnimationFrame(step);
    }

    function getTargetScroll(el: HTMLElement): number {
      const block = getBlockRect(el);
      const availableH = window.innerHeight - NAV_HEIGHT;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (block.height <= availableH) {
        // Center the block (section + separators) in the available area below navbar
        const idealTop = NAV_HEIGHT + (availableH - block.height) / 2;
        return block.top + window.scrollY - idealTop;
      } else {
        // Block taller than viewport: snap to whichever edge is closer
        const topAlign = block.top + window.scrollY - NAV_HEIGHT;
        const bottomAlign = block.bottom + window.scrollY - window.innerHeight;

        if (Math.abs(window.scrollY - topAlign) <= Math.abs(window.scrollY - bottomAlign)) {
          return topAlign;
        } else {
          return Math.min(bottomAlign, maxScroll);
        }
      }
    }

    const isMobile = window.innerWidth <= 767;

    function onScrollEnd() {
      if (isSnapping || isMobile) return; // No auto-snap on mobile
      const target = getMostVisible();
      if (!target) return;

      const targetY = Math.max(0, getTargetScroll(target));
      const distance = Math.abs(targetY - window.scrollY);

      if (distance < 10) return;

      isSnapping = true;
      smoothScrollTo(targetY);
    }

    function onUserInput() {
      if (isSnapping) {
        isSnapping = false;
        cancelAnimationFrame(rafId);
        document.documentElement.style.scrollBehavior = "";
      }
      if (timer) clearTimeout(timer);
      if (!isMobile) {
        timer = setTimeout(onScrollEnd, IDLE_DELAY);
      }
    }

    // --- Nav link smooth scroll ---
    function onNavClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      // Logo click — scroll to top
      if (href === "/") {
        e.preventDefault();
        if (isSnapping) { isSnapping = false; cancelAnimationFrame(rafId); }
        if (timer) clearTimeout(timer);
        isSnapping = true;
        smoothScrollTo(0, true);
        return;
      }

      // Anchor links
      if (!href.startsWith("#") || href === "#") return;
      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();

      // Cancel any ongoing snap
      if (isSnapping) {
        isSnapping = false;
        cancelAnimationFrame(rafId);
      }
      if (timer) clearTimeout(timer);

      // Use same targeting logic as the auto-snap, but faster
      const targetY = Math.max(0, getTargetScroll(targetEl as HTMLElement));
      isSnapping = true;
      smoothScrollTo(targetY, true);
    }

    const nav = document.querySelector(".nav");
    if (nav) {
      nav.addEventListener("click", onNavClick as EventListener);
    }

    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchstart", onUserInput, { passive: true });
    window.addEventListener("touchmove", onUserInput, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"].includes(e.key)) {
        onUserInput();
      }
    }, { passive: true });

    return () => {
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("touchmove", onUserInput);
      if (nav) {
        nav.removeEventListener("click", onNavClick as EventListener);
      }
      cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
