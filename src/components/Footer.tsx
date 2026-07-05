"use client";

import { motion } from "framer-motion";
import { Compass, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const COLUMNS = [
  { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
  { title: "Support", links: ["Help center", "Cancellation", "Safety", "Contact"] },
  { title: "Discover", links: ["Trust & safety", "Gift cards", "Wanderlic+", "Community"] },
];

export default function Footer() {
  return (
    <footer className="relative bg-paper px-4 pb-10 pt-24">
      <div className="mx-auto max-w-6xl">
        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20 overflow-hidden rounded-[32px] bg-ocean-900 p-10 sm:p-14"
        >
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h3 className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Your next adventure is one{" "}
                <em className="italic text-terra-300">search</em> away.
              </h3>
              <p className="mt-3 max-w-md text-white/70">
                Join the newsletter for handpicked stays and members-only rates.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md items-center gap-2 rounded-full bg-white/95 p-2 shadow-float"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm font-medium text-ink outline-none placeholder:text-ink/40"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
              >
                Subscribe
                <ArrowRight size={16} />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-10 border-b border-ink/10 pb-14 sm:grid-cols-4 lg:grid-cols-5"
        >
          <motion.div variants={fadeUp} className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean-700 text-white">
                <Compass size={20} />
              </span>
              <span className="text-lg font-extrabold text-ink">Wanderlic</span>
            </div>
            <p className="max-w-xs text-sm text-ink/50">
              Stays that fit your style, budget, and travel needs — thoughtfully
              curated across the globe.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-ink/[0.05] text-ink/60 transition-colors hover:bg-ocean-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {COLUMNS.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <p className="mb-4 text-sm font-bold text-ink">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink/50 transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-ink/45 sm:flex-row">
          <p>© 2025 Wanderlic. Crafted for explorers.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">Privacy</a>
            <a href="#" className="transition-colors hover:text-ink">Terms</a>
            <a href="#" className="transition-colors hover:text-ink">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
