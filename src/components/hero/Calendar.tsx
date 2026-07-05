"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  WEEKDAYS,
  MONTHS,
  buildMonthGrid,
  isSameDay,
  isBetween,
  addMonths,
  type DayCell,
} from "@/lib/calendar";
import { easeExpo } from "@/lib/motion";

type Props = {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
  viewYear: number;
  viewMonth: number;
  onNavigate: (delta: number) => void;
};

function MonthGrid({
  year,
  month,
  checkIn,
  checkOut,
  hoverBase,
  onSelect,
}: {
  year: number;
  month: number;
  checkIn: Date | null;
  checkOut: Date | null;
  hoverBase: Date | null;
  onSelect: (d: Date) => void;
}) {
  const cells = buildMonthGrid(year, month);

  return (
    <div className="flex-1">
      <p className="mb-4 text-center text-[15px] font-bold text-ink">
        {MONTHS[month]}, {year}
      </p>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <span
            key={w}
            className="py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-ink/40"
          >
            {w}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell: DayCell) => {
          if (!cell.date) {
            return <span key={cell.key} className="aspect-square" />;
          }
          const day = cell.date;
          const isStart = isSameDay(day, checkIn);
          const isEnd = isSameDay(day, checkOut);
          const inRange = isBetween(day, checkIn, checkOut);
          const isEdge = isStart || isEnd;

          return (
            <div key={cell.key} className="relative aspect-square">
              {/* range highlight band behind the pill */}
              {(inRange || isEdge) && checkIn && checkOut && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute inset-y-1.5 bg-ocean-100/70 ${
                    isStart ? "left-1/2 right-0 rounded-l-full" : ""
                  } ${isEnd ? "left-0 right-1/2 rounded-r-full" : ""} ${
                    inRange ? "inset-x-0" : ""
                  }`}
                />
              )}
              {/* selected pill — layoutId makes it glide when the date changes */}
              {isEdge && (
                <motion.span
                  layoutId={isStart ? "day-pill-start" : "day-pill-end"}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0.5 z-[5] rounded-full bg-ocean-700 shadow-pill"
                />
              )}
              <motion.button
                type="button"
                onClick={() => onSelect(day)}
                whileTap={{ scale: 0.85 }}
                className={`relative z-10 grid h-full w-full place-items-center rounded-full text-[13px] font-semibold transition-colors duration-200
                  ${
                    isEdge
                      ? "text-white"
                      : inRange
                        ? "text-ocean-700"
                        : "text-ink/70 hover:bg-ink/[0.06]"
                  }`}
              >
                {day.getDate()}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Calendar({
  checkIn,
  checkOut,
  onSelect,
  viewYear,
  viewMonth,
  onNavigate,
}: Props) {
  const next = addMonths(viewYear, viewMonth, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.35, ease: easeExpo }}
      className="glass overflow-hidden rounded-[26px] border border-white/60 p-6 shadow-float sm:p-7"
    >
      {/* Tabs row */}
      <div className="mb-5 flex items-center justify-center gap-8 border-b border-ink/10 pb-3 text-sm">
        <button className="relative font-semibold text-ink">
          Calendar
          <motion.span
            layoutId="cal-underline"
            className="absolute -bottom-[13px] left-0 right-0 h-0.5 rounded-full bg-ocean-600"
          />
        </button>
        <button className="font-medium text-ink/40 transition-colors hover:text-ink/70">
          I&apos;m flexible
        </button>
      </div>

      <div className="relative flex flex-col gap-8 sm:flex-row">
        {/* nav buttons */}
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          aria-label="Previous month"
          className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full text-ink/60 transition-all hover:bg-ink/[0.06] hover:text-ink active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => onNavigate(1)}
          aria-label="Next month"
          className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-full text-ink/60 transition-all hover:bg-ink/[0.06] hover:text-ink active:scale-90"
        >
          <ChevronRight size={18} />
        </button>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${viewYear}-${viewMonth}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: easeExpo }}
            className="flex flex-1 flex-col gap-8 sm:flex-row"
          >
            <MonthGrid
              year={viewYear}
              month={viewMonth}
              checkIn={checkIn}
              checkOut={checkOut}
              hoverBase={null}
              onSelect={onSelect}
            />
            <div className="hidden w-px bg-ink/10 sm:block" />
            <MonthGrid
              year={next.year}
              month={next.month}
              checkIn={checkIn}
              checkOut={checkOut}
              hoverBase={null}
              onSelect={onSelect}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
