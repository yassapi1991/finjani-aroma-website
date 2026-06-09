"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

export function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Café en Grains", href: "/menu#cafe-en-grains" },
    { label: "Gelato Italiano", href: "/menu#gelato-italiano" },
    { label: "Tartes Glacées", href: "/menu#tartes-glacees" },
    { label: "À propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--coffee-line)] bg-[var(--coffee-cream)] shadow-[0_4px_16px_rgba(130,96,65,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="page-shell">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="group flex h-10 w-32 items-center sm:h-12 sm:w-40">
            <Image
              src="/finjani-aroma-logo.jpeg"
              alt="Finjani Aroma"
              fill
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.18em] text-[var(--coffee-ink)] transition-colors duration-300 hover:text-[var(--coffee-gold)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="transition-colors duration-300 text-[var(--coffee-ink)] hover:text-[var(--coffee-gold)]">
              <FaSearch className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="transition-colors duration-300 text-[var(--coffee-ink)] hover:text-[var(--coffee-gold)]">
              <FaShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="transition-colors duration-300 text-[var(--coffee-ink)] hover:text-[var(--coffee-gold)]">
              <FaUser className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="ml-4 lg:hidden flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-[var(--coffee-ink)]" />
            <span className="block h-0.5 w-5 bg-[var(--coffee-ink)]" />
            <span className="block h-0.5 w-5 bg-[var(--coffee-ink)]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
