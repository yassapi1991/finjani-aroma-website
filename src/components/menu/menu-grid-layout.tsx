"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MenuGridLayoutProps {
  children: ReactNode;
  columns?: "2" | "3" | "4";
  loading?: boolean;
  emptyMessage?: string;
  itemCount?: number;
}

export function MenuGridLayout({
  children,
  columns = "3",
  loading = false,
  emptyMessage = "Aucun produit trouvé.",
  itemCount,
}: MenuGridLayoutProps) {
  const gridColsClass = {
    "2": "sm:grid-cols-2 lg:grid-cols-2",
    "3": "sm:grid-cols-2 lg:grid-cols-3",
    "4": "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  if (loading) {
    return (
      <div className={`grid gap-5 sm:gap-6 ${gridColsClass}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-3xl bg-[var(--coffee-line)] opacity-30"
          />
        ))}
      </div>
    );
  }

  if (!itemCount || itemCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center rounded-3xl border-2 border-dashed border-[var(--coffee-line)] py-16 text-center"
      >
        <div>
          <p className="text-lg text-[var(--coffee-muted)]">{emptyMessage}</p>
          <p className="mt-2 text-sm text-[var(--coffee-muted)]/60">
            Affinez votre recherche ou explorez d&apos;autres catégories.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`grid gap-5 sm:gap-6 ${gridColsClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// Animated grid item wrapper
export function MenuGridItem({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
