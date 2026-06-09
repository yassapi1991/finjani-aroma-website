"use client";

import { useReveal } from "@/hooks/use-reveal";
import type { ElementType, ReactNode } from "react";

/**
 * Wraps any section in an IntersectionObserver that triggers .reveal elements
 * inside it. Use as:
 *   <RevealSection as="section" className="page-shell">
 *     <div data-reveal className="reveal">…</div>
 *   </RevealSection>
 */
export function RevealSection({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
