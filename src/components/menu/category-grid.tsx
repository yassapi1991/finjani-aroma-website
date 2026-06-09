"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface MenuCategory {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
  color?: string;
}

interface CategoryGridProps {
  categories: MenuCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {categories.map((category, index) => (
        <motion.div key={category.id} variants={itemVariants}>
          <Link href={category.href}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-[var(--coffee-line)] bg-gradient-to-br from-[var(--coffee-card)] to-[var(--coffee-cream)] p-7 shadow-[0_12px_28px_rgba(130,96,65,0.1)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(130,96,65,0.18)] cursor-pointer">
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--coffee-gold)]/8 via-transparent to-transparent" />
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--coffee-gold)]/10 blur-3xl" />
              </motion.div>

              <div className="relative">
                {/* Icon Container */}
                <motion.div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--coffee-gold)]/12 transition-all duration-500 group-hover:bg-[var(--coffee-gold)]/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{category.icon}</span>
                </motion.div>

                {/* Label */}
                <motion.p
                  className="text-[10px] uppercase tracking-[0.22em] text-[var(--coffee-gold)]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {category.label}
                </motion.p>

                {/* Title */}
                <motion.h3
                  className="mt-3 font-serif text-2xl text-[var(--coffee-ink)] transition-colors duration-300 group-hover:text-[var(--coffee-gold)] sm:text-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  {category.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="mt-3 text-sm leading-relaxed text-[var(--coffee-muted)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {category.description}
                </motion.p>

                {/* CTA */}
                <motion.div
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--coffee-gold)] font-semibold"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Découvrir
                  <motion.svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
