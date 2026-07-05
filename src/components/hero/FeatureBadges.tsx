"use client";

import { motion } from "framer-motion";
import { Luggage, Sparkles, BadgePercent } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const ITEMS = [
  {
    icon: Luggage,
    title: "Backed by travelers",
    sub: "2M+ trips booked worldwide",
  },
  {
    icon: Sparkles,
    title: "Stays for every style",
    sub: "From cabins to city lofts",
  },
  {
    icon: BadgePercent,
    title: "Best rates around",
    sub: "Price-match guarantee",
  },
];

export default function FeatureBadges() {
  return (
    <motion.div
      variants={stagger(0.14, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3"
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="group flex flex-col items-start gap-4 bg-paper p-7 transition-colors duration-300 hover:bg-paper-deep"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 group-hover:border-terra-500 group-hover:text-terra-500">
              <Icon size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-ink-faint">{item.sub}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
