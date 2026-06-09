"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver that adds the `is-visible` class
 * to all child elements matching [data-reveal] when they enter the viewport.
 * Pairs with the `.reveal` / `.reveal.is-visible` CSS rules in globals.css.
 */
export function useReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return containerRef;
}
