"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Menu, Compass } from "lucide-react";
import { easeExpo } from "@/lib/motion";

const LINKS = ["Stays", "Flights", "Experiences", "Deals"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeExpo }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled
            ? "glass border border-white/50 shadow-card"
            : "border border-white/15 bg-white/5 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.5, ease: easeExpo }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-ocean-700 text-white shadow-pill"
          >
            <Compass size={20} />
          </motion.span>
          <span
            className={`text-lg font-extrabold tracking-tight transition-colors ${
              scrolled ? "text-ink" : "text-white"
            }`}
          >
            Wanderlic
          </span>
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  scrolled ? "text-ink/70 hover:text-ink" : "text-white/80 hover:text-white"
                }`}
              >
                {link}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className={`hidden h-10 w-10 place-items-center rounded-full transition-colors sm:grid ${
              scrolled ? "text-ink/60 hover:bg-ink/5" : "text-white/80 hover:bg-white/10"
            }`}
            aria-label="Language"
          >
            <Globe size={18} />
          </button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white shadow-pill transition-shadow hover:shadow-float"
          >
            Sign in
          </motion.button>
          <button
            className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${
              scrolled ? "text-ink" : "text-white"
            }`}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
