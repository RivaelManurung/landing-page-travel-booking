"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Check, TrendingUp, Search, ArrowRight } from "lucide-react";
import { easeExpo } from "@/lib/motion";

export type Destination = {
  city: string;
  country: string;
  hint: string;
};

export const DESTINATIONS: Destination[] = [
  { city: "New York", country: "United States", hint: "City break" },
  { city: "Santorini", country: "Greece", hint: "Trending" },
  { city: "Tokyo", country: "Japan", hint: "Culture" },
  { city: "Bali", country: "Indonesia", hint: "Beach" },
  { city: "Paris", country: "France", hint: "Romantic" },
  { city: "Zermatt", country: "Switzerland", hint: "Mountains" },
];

export default function DestinationPicker({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (d: Destination) => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter(
      (d) =>
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.hint.toLowerCase().includes(q)
    );
  }, [query]);

  const customQuery = query.trim();
  const hasExactMatch = results.some(
    (d) => d.city.toLowerCase() === customQuery.toLowerCase()
  );

  const submitFirst = () => {
    if (results.length > 0) {
      onSelect(results[0]);
    } else if (customQuery) {
      onSelect({ city: customQuery, country: "", hint: "Custom" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: easeExpo }}
      className="glass w-80 overflow-hidden rounded-3xl border border-white/60 p-2.5 shadow-float"
    >
      {/* Search input */}
      <div className="mb-1.5 flex items-center gap-2 rounded-2xl bg-ink/[0.05] px-3.5 py-2.5 ring-1 ring-transparent transition-shadow focus-within:bg-white focus-within:ring-ocean-300">
        <Search size={16} className="shrink-0 text-ink-faint" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submitFirst()}
          placeholder="Search city or country…"
          autoFocus
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-faint"
        />
      </div>

      <p className="flex items-center gap-1.5 px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        <TrendingUp size={12} className="text-terra-500" />
        {query ? `Results for "${customQuery}"` : "Popular destinations"}
      </p>

      <div className="max-h-72 overflow-y-auto">
        <AnimatePresence initial={false} mode="popLayout">
          {results.map((d, i) => {
            const isActive = selected.startsWith(d.city);
            return (
              <motion.button
                key={d.city}
                type="button"
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.03, duration: 0.25, ease: easeExpo }}
                onClick={() => onSelect(d)}
                className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                  isActive ? "bg-ocean-50" : "hover:bg-ink/[0.04]"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
                    isActive
                      ? "bg-ocean-700 text-white"
                      : "bg-ink/5 text-ink-faint group-hover:text-ocean-700"
                  }`}
                >
                  <MapPin size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink">
                    {d.city}
                    <span className="font-medium text-ink-faint">
                      , {d.country}
                    </span>
                  </span>
                  <span className="block text-xs text-ink-faint">{d.hint}</span>
                </span>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 24 }}
                    className="text-ocean-700"
                  >
                    <Check size={18} strokeWidth={3} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Custom entry — search anywhere, even outside the curated list */}
        {customQuery && !hasExactMatch && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: easeExpo }}
            onClick={() =>
              onSelect({ city: customQuery, country: "", hint: "Custom" })
            }
            className="group mt-1 flex w-full items-center gap-3 rounded-2xl border border-dashed border-ink/20 px-3 py-2.5 text-left transition-colors hover:border-ocean-400 hover:bg-ocean-50"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-faint transition-colors group-hover:bg-ocean-700 group-hover:text-white">
              <ArrowRight size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-ink">
                Search “{customQuery}”
              </span>
              <span className="block text-xs text-ink-faint">
                Use this destination
              </span>
            </span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
