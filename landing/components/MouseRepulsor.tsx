"use client";

import { useRef, useEffect, type ReactNode } from "react";

const STRENGTH = 30;
const RADIUS = 400;
const LERP_SPEED = 0.08;
const GYRO_STRENGTH = 35;

interface Card {
  el: HTMLElement;
  tx: number;
  ty: number;
}

// ---- Global gyroscope singleton (shared across all MouseRepulsor instances) ----
let gyroX = 0;
let gyroY = 0;
let gyroActive = false;
let gyroRequested = false;

function onOrientation(e: DeviceOrientationEvent) {
  const gamma = e.gamma ?? 0;
  const beta = e.beta ?? 0;
  // Normalize to -1..1 range (clamped at ~20 degrees of tilt)
  // gamma: left/right tilt. beta: forward/back — neutral ~70deg for portrait hold
  gyroX = Math.max(-1, Math.min(1, gamma / 20));
  gyroY = Math.max(-1, Math.min(1, (beta - 70) / 20));
  gyroActive = true;
}

async function requestGyro() {
  if (gyroRequested) return;
  gyroRequested = true;

  const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<string>;
  };

  if (typeof DOE.requestPermission === "function") {
    // iOS 13+ — must be called from a user gesture (click)
    try {
      const perm = await DOE.requestPermission();
      if (perm === "granted") {
        window.addEventListener("deviceorientation", onOrientation, { passive: true });
      }
    } catch {
      gyroRequested = false; // Allow retry
    }
  } else {
    // Android / older iOS — no permission needed
    window.addEventListener("deviceorientation", onOrientation, { passive: true });
  }
}

// On mobile, set up gyro
if (typeof window !== "undefined" && "ontouchstart" in window) {
  const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<string>;
  };

  if (typeof DOE.requestPermission === "function") {
    // iOS — request on first click (user gesture required)
    function onFirstClick() {
      requestGyro();
      document.removeEventListener("click", onFirstClick);
    }
    document.addEventListener("click", onFirstClick, { passive: true });
  } else {
    // Android — start immediately, no permission needed
    requestGyro();
  }
}

// ---- Component ----
export default function MouseRepulsor({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let running = true;
    let mx = 0;
    let my = 0;
    let active = false;
    let cards: Card[] = [];
    let raf = 0;
    const isMobile = "ontouchstart" in window;

    function scan() {
      const els = container!.querySelectorAll<HTMLElement>("[data-repulse]");
      const old = new Map(cards.map((c) => [c.el, c]));
      cards = Array.from(els).map((el) => old.get(el) || { el, tx: 0, ty: 0 });
    }

    function getScale(): number {
      const t = getComputedStyle(container!).transform;
      if (!t || t === "none") return 1;
      const m = t.match(/matrix\(([^,]+)/);
      return m ? Math.abs(parseFloat(m[1])) : 1;
    }

    function tick() {
      if (!running) return;
      const s = getScale();

      for (const c of cards) {
        let gx = 0;
        let gy = 0;

        let lerpRate = LERP_SPEED;

        if (isMobile && gyroActive) {
          // Gyroscope: tilt moves all cards uniformly
          gx = gyroX * GYRO_STRENGTH;
          gy = gyroY * GYRO_STRENGTH;
          lerpRate = 0.15; // Faster response for gyro
        } else if (active) {
          const r = c.el.getBoundingClientRect();
          const bx = r.left + r.width / 2 - c.tx * s;
          const by = r.top + r.height / 2 - c.ty * s;
          const dx = bx - mx;
          const dy = by - my;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < RADIUS && d > 0.1) {
            const f = (1 - d / RADIUS) * STRENGTH;
            gx = (dx / d) * f / s;
            gy = (dy / d) * f / s;
          }
        }

        c.tx += (gx - c.tx) * lerpRate;
        c.ty += (gy - c.ty) * lerpRate;

        if (Math.abs(c.tx) < 0.01 && Math.abs(c.ty) < 0.01) {
          c.tx = 0;
          c.ty = 0;
        }

        const base = window.innerWidth >= 1200 ? (c.el.dataset.baseTransform || "") : "";
        c.el.style.transform =
          c.tx === 0 && c.ty === 0
            ? base
            : base
              ? `${base} translate(${c.tx}px,${c.ty}px)`
              : `translate(${c.tx}px,${c.ty}px)`;
      }

      raf = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      active = true;
    }

    function onLeaveViewport() {
      active = false;
    }

    // Scan immediately, then again after React hydration, then periodically
    scan();
    setTimeout(scan, 100);
    setTimeout(scan, 500);
    const rescan = setInterval(scan, 2000);

    // MutationObserver to catch children mounting
    const observer = new MutationObserver(scan);
    observer.observe(container, { childList: true, subtree: true });

    // Global mouse tracking — works regardless of scroll/section
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveViewport);

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveViewport);
      cancelAnimationFrame(raf);
      clearInterval(rescan);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
