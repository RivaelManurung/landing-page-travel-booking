"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "2M+ Happy Travelers",
  "120+ Countries",
  "50K+ Verified Stays",
  "24/7 Support",
  "Price-Match Guarantee",
  "Free Cancellation",
];

export default function StatsMarquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-paper-deep py-4">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-12 whitespace-nowrap"
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-base italic tracking-tight text-ink/70"
          >
            {item}
            <span className="text-terra-500">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
