"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Check } from "lucide-react";
import { easeExpo } from "@/lib/motion";

export type Guests = {
  adults: number;
  children: number;
  rooms: number;
};

const ROWS: { key: keyof Guests; label: string; hint: string; min: number }[] = [
  { key: "adults", label: "Adults", hint: "Ages 13+", min: 1 },
  { key: "children", label: "Children", hint: "Ages 2-12", min: 0 },
  { key: "rooms", label: "Rooms", hint: "Bedrooms needed", min: 1 },
];

export default function GuestSelector({
  guests,
  onChange,
  onDone,
}: {
  guests: Guests;
  onChange: (g: Guests) => void;
  onDone: () => void;
}) {
  const step = (key: keyof Guests, delta: number, min: number) => {
    const nextVal = Math.max(min, guests[key] + delta);
    onChange({ ...guests, [key]: nextVal });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: easeExpo }}
      className="glass w-72 rounded-3xl border border-white/60 p-5 shadow-float"
    >
      {ROWS.map((row) => (
        <div
          key={row.key}
          className="flex items-center justify-between py-3 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-ink/10"
        >
          <div>
            <p className="text-sm font-bold text-ink">{row.label}</p>
            <p className="text-xs text-ink/45">{row.hint}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={`Decrease ${row.label}`}
              onClick={() => step(row.key, -1, row.min)}
              disabled={guests[row.key] <= row.min}
              className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-ocean-500 hover:text-ocean-600 active:scale-90 disabled:opacity-30 disabled:hover:border-ink/15"
            >
              <Minus size={15} />
            </button>
            <span className="relative h-5 w-5 overflow-hidden text-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={guests[row.key]}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 text-sm font-bold tabular-nums text-ink"
                >
                  {guests[row.key]}
                </motion.span>
              </AnimatePresence>
            </span>
            <button
              type="button"
              aria-label={`Increase ${row.label}`}
              onClick={() => step(row.key, 1, row.min)}
              className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-ocean-500 hover:text-ocean-600 active:scale-90"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      ))}
      <motion.button
        type="button"
        onClick={onDone}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ocean-700 py-2.5 text-sm font-bold text-white transition-colors hover:bg-ocean-800"
      >
        <Check size={16} strokeWidth={3} />
        Done
      </motion.button>
    </motion.div>
  );
}
