"use client";

import { ProductCategory, CATEGORY_LABELS } from "@/lib/types";

const filters: Array<"Tous" | ProductCategory> = [
  "Tous",
  "Café en Grains",
  "Gelato Italiano",
  "Tartes Glacées",
];

const filterLabels: Record<"Tous" | ProductCategory, string> = {
  Tous: "Tous",
  ...CATEGORY_LABELS,
};

interface FilterBarProps {
  value: "Tous" | ProductCategory;
  onChange: (value: "Tous" | ProductCategory) => void;
}

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`rounded-full border px-4 py-2.5 text-xs uppercase tracking-[0.14em] shadow-[0_6px_16px_rgba(138,103,71,0.08)] transition-all duration-300 ${
            value === filter
              ? "border-[var(--coffee-olive)] bg-[var(--coffee-olive)] text-[var(--coffee-cream)] shadow-[0_10px_22px_rgba(84,95,61,0.2)]"
              : "border-[var(--coffee-line)] bg-[var(--coffee-card)] text-[var(--coffee-muted)] hover:border-[var(--coffee-gold)] hover:text-[var(--coffee-ink)]"
          }`}
        >
          {filterLabels[filter]}
        </button>
      ))}
    </div>
  );
}
