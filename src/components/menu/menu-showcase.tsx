"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Product, ProductCategory } from "@/lib/types";
import { FilterBar } from "@/components/menu/filter-bar";
import { ProductCard } from "@/components/menu/product-card";
import { QrMenu } from "@/components/menu/qr-menu";

interface MenuShowcaseProps {
  products: Product[];
}

export function MenuShowcase({ products }: MenuShowcaseProps) {
  const [filter, setFilter] = useState<"Tous" | ProductCategory>("Tous");

  const filtered = useMemo(() => {
    if (filter === "Tous") return products;
    return products.filter((product) => product.category === filter);
  }, [filter, products]);

  return (
    <div className="space-y-6">
      <FilterBar value={filter} onChange={setFilter} />
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        <div className="xl:sticky xl:top-24 xl:self-start">
          <QrMenu />
        </div>
      </div>
    </div>
  );
}
