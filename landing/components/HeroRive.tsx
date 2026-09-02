"use client";

import { useEffect, useRef, useState } from "react";
import { useRive, Layout, Fit } from "@rive-app/react-canvas";

const MOBILE_BREAKPOINT = 767;

function useIsMobilePortrait() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    }
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function DesktopRive() {
  const { RiveComponent } = useRive({
    src: "/apps/lerp/lerp-full-scren-hero.riv",
    autoplay: true,
    autoBind: true,
    stateMachine: "State Machine 1",
    layout: new Layout({ fit: Fit.Fill }),
  });
  return <RiveComponent />;
}

function PortraitRive() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { rive, RiveComponent } = useRive({
    src: "/apps/lerp/lerp-portrait.riv",
    autoplay: true,
    autoBind: true,
    stateMachine: "State Machine 1",
    layout: new Layout({ fit: Fit.Fill }),
  });

  // Feed gyroscope tilt into Rive's pointer tracking
  useEffect(() => {
    if (!rive) return;

    function onOrientation(e: DeviceOrientationEvent) {
      const canvas = wrapRef.current?.querySelector("canvas");
      if (!canvas) return;

      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      const rect = canvas.getBoundingClientRect();

      // Very sensitive — ±15deg saturates
      const rawX = Math.max(-1, Math.min(1, gamma / 15));
      const rawY = Math.max(-1, Math.min(1, (beta - 70) / 15));

      // Remap: cardinal tilts → diagonal screen positions
      const screenX = Math.max(-1, Math.min(1, (rawX + rawY) * 0.707));
      const screenY = Math.max(-1, Math.min(1, (-rawX + rawY) * 0.707));

      const x = rect.left + (0.5 + screenX * 0.5) * rect.width;
      const y = rect.top + (0.5 + screenY * 0.5) * rect.height;

      const clampedX = Math.max(rect.left, Math.min(rect.right, x));
      const clampedY = Math.max(rect.top, Math.min(rect.bottom, y));

      for (const EventType of [PointerEvent, MouseEvent]) {
        const evName = EventType === PointerEvent ? "pointermove" : "mousemove";
        canvas.dispatchEvent(
          new EventType(evName, {
            clientX: clampedX,
            clientY: clampedY,
            bubbles: true,
            cancelable: true,
            ...(EventType === PointerEvent ? { pointerType: "mouse", pointerId: 1 } : {}),
          } as any)
        );
      }
    }

    window.addEventListener("deviceorientation", onOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [rive]);

  return (
    <div ref={wrapRef}>
      <RiveComponent />
    </div>
  );
}

export default function HeroRive() {
  const isMobile = useIsMobilePortrait();

  return isMobile ? <PortraitRive /> : <DesktopRive />;
}
