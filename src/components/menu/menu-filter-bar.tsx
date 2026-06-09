"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MenuFilterOption {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

interface MenuFilterBarProps {
  filters: MenuFilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  enableSearch?: boolean;
}

export function MenuFilterBar({
  filters,
  activeFilter,
  onFilterChange,
  searchQuery = "",
  onSearchChange,
  enableSearch = true,
}: MenuFilterBarProps) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      {enableSearch && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-full border border-[var(--coffee-line)] bg-[var(--coffee-cream)]">
            <input
              type="text"
              placeholder="Recherchez un produit..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="w-full bg-transparent px-6 py-3.5 text-sm placeholder-[var(--coffee-muted)] outline-none transition-all"
            />
            <svg
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--coffee-gold)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap"
      >
        {filters.map((filter, index) => (
          <motion.button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-300 ${
              activeFilter === filter.id
                ? "border-[var(--coffee-gold)] bg-[var(--coffee-gold)] text-[var(--coffee-cream)] shadow-[0_8px_20px_rgba(184,119,74,0.24)]"
                : "border border-[var(--coffee-line)] bg-[var(--coffee-cream)] text-[var(--coffee-ink)] hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-gold)]"
            }`}
          >
            {filter.icon && <span className="text-sm">{filter.icon}</span>}
            {filter.label}
            {filter.count !== undefined && (
              <span className="ml-1 rounded-full bg-[var(--coffee-gold)]/20 px-2 py-0.5 text-[10px]">
                {filter.count}
              </span>
            )}

            {/* Active indicator */}
            {activeFilter === filter.id && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full"
                initial={false}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
