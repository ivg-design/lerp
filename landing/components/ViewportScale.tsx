"use client";

import { useEffect } from "react";

export default function ViewportScale() {
  useEffect(() => {
    function update() {
      const scale = Math.min(1, window.innerWidth / 1920);
      document.documentElement.style.setProperty("--vw-scale", String(scale));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return null;
}
