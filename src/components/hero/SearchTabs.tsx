"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  Plane,
  TramFront,
  FerrisWheel,
  Building2,
  type LucideIcon,
} from "lucide-react";

export type TabId = "hotels" | "flights" | "trains" | "attractions" | "bundle";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "hotels", label: "Hotels", icon: BedDouble },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "trains", label: "Trains", icon: TramFront },
  { id: "attractions", label: "Attractions", icon: FerrisWheel },
  { id: "bundle", label: "Flight + Hotel", icon: Building2 },
];

export default function SearchTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-sm ring-1 ring-black/5 backdrop-blur">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200 sm:text-sm ${
              isActive ? "text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-ink shadow-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon
              size={16}
              className={`relative z-10 transition-transform ${
                isActive ? "scale-110" : ""
              }`}
            />
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
