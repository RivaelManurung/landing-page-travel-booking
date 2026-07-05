"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  UserRound,
  Search,
  Moon,
  Loader2,
  Check,
} from "lucide-react";
import SearchTabs, { type TabId } from "./SearchTabs";
import Calendar from "./Calendar";
import GuestSelector, { type Guests } from "./GuestSelector";
import DestinationPicker, { type Destination } from "./DestinationPicker";
import Toast, { type ToastData } from "@/components/ui/Toast";
import { formatShort, nightsBetween, addMonths } from "@/lib/calendar";
import { easeExpo } from "@/lib/motion";

type OpenPanel = "destination" | "dates" | "guests" | null;
type SearchStatus = "idle" | "searching" | "done";

const TAB_CONFIG: Record<
  TabId,
  {
    destLabel: string;
    inLabel: string;
    outLabel: string;
    guestLabel: string;
    noun: string;
  }
> = {
  hotels: {
    destLabel: "Destination",
    inLabel: "Check-in",
    outLabel: "Check-out",
    guestLabel: "Guests",
    noun: "stays",
  },
  flights: {
    destLabel: "Fly to",
    inLabel: "Departure",
    outLabel: "Return",
    guestLabel: "Passengers",
    noun: "flights",
  },
  trains: {
    destLabel: "Travel to",
    inLabel: "Departure",
    outLabel: "Return",
    guestLabel: "Passengers",
    noun: "routes",
  },
  attractions: {
    destLabel: "Where to",
    inLabel: "Visit from",
    outLabel: "Visit until",
    guestLabel: "Tickets",
    noun: "attractions",
  },
  bundle: {
    destLabel: "Destination",
    inLabel: "Check-in",
    outLabel: "Check-out",
    guestLabel: "Travelers",
    noun: "packages",
  },
};

const SEARCH_DELAY_MS = 1400;
const TOAST_DURATION_MS = 2600;
const DATE_CLOSE_DELAY_MS = 550;

function Field({
  icon,
  label,
  value,
  active,
  onClick,
  wide,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
  onClick?: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
        wide ? "flex-1" : ""
      } ${active ? "bg-ocean-50 ring-1 ring-ocean-200" : "hover:bg-ink/[0.04]"}`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
          active
            ? "bg-ocean-700 text-white"
            : "bg-ink/5 text-ink-faint group-hover:text-ocean-700"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          {label}
        </span>
        <span className="block truncate text-[14px] font-bold text-ink">
          {value}
        </span>
      </span>
    </button>
  );
}

export default function SearchBar() {
  const [tab, setTab] = useState<TabId>("hotels");
  const [panel, setPanel] = useState<OpenPanel>(null);
  const [destination, setDestination] = useState("New York, United States");
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2025, 10, 20));
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2025, 10, 23));
  const [guests, setGuests] = useState<Guests>({ adults: 1, children: 2, rooms: 1 });
  const [view, setView] = useState({ year: 2025, month: 10 }); // Nov 2025
  const [business, setBusiness] = useState(false);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [toast, setToast] = useState<ToastData | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const conf = TAB_CONFIG[tab];

  // every timeout is registered here and swept on unmount
  const later = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const showToast = useCallback(
    (message: string, kind: ToastData["kind"] = "success") => {
      const id = Date.now();
      setToast({ id, message, kind });
      later(() => {
        setToast((t) => (t?.id === id ? null : t));
      }, TOAST_DURATION_MS);
    },
    [later]
  );

  // close panels on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setPanel(null);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleTabChange = (id: TabId) => {
    setTab(id);
    setPanel(null);
  };

  const handleDestinationPick = (d: Destination) => {
    setDestination(d.country ? `${d.city}, ${d.country}` : d.city);
    setPanel(null);
    showToast(`Destination set to ${d.city}`);
  };

  const handleDatePick = (date: Date) => {
    // fresh range if both set, or clicked before check-in
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    if (date.getTime() < checkIn.getTime()) {
      setCheckIn(date);
      return;
    }
    setCheckOut(date);
    const nights = nightsBetween(checkIn, date);
    later(() => {
      setPanel(null);
      showToast(`Dates confirmed · ${nights} night${nights !== 1 ? "s" : ""}`);
    }, DATE_CLOSE_DELAY_MS);
  };

  const handleGuestsDone = () => {
    setPanel(null);
    const total = guests.adults + guests.children;
    showToast(
      `${total} ${conf.guestLabel.toLowerCase()}, ${guests.rooms} room${
        guests.rooms !== 1 ? "s" : ""
      } saved`
    );
  };

  const handleSearch = () => {
    if (status !== "idle") return;
    setPanel(null);
    setStatus("searching");
    const city = destination.split(",")[0];
    later(() => {
      setStatus("done");
      showToast(`Found 1,248 ${conf.noun} in ${city}`);
      later(() => setStatus("idle"), 1800);
    }, SEARCH_DELAY_MS);
  };

  const nights = nightsBetween(checkIn, checkOut);
  const guestTotal = guests.adults + guests.children;

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* Tabs */}
      <div className="mb-4 flex justify-center">
        <SearchTabs active={tab} onChange={handleTabChange} />
      </div>

      {/* Main search card */}
      <motion.div
        layout
        className="glass rounded-[30px] border border-white/60 p-3 shadow-float"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: easeExpo }}
            className="flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center"
          >
            <Field
              wide
              icon={<MapPin size={17} />}
              label={conf.destLabel}
              value={destination}
              active={panel === "destination"}
              onClick={() =>
                setPanel(panel === "destination" ? null : "destination")
              }
            />

            <span className="hidden h-10 w-px shrink-0 bg-ink/10 lg:block" />

            <Field
              icon={<CalendarDays size={17} />}
              label={conf.inLabel}
              value={checkIn ? formatShort(checkIn) : "Add dates"}
              active={panel === "dates"}
              onClick={() => setPanel(panel === "dates" ? null : "dates")}
            />

            {/* nights pill */}
            <div className="hidden items-center justify-center px-1 lg:flex">
              <span className="flex items-center gap-1 rounded-full bg-ink/5 px-3 py-1.5 text-[11px] font-bold text-ink/60">
                <Moon size={12} className="text-ocean-500" />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={nights}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="tabular-nums"
                  >
                    {nights}
                  </motion.span>
                </AnimatePresence>
                night{nights !== 1 ? "s" : ""}
              </span>
            </div>

            <Field
              icon={<CalendarDays size={17} />}
              label={conf.outLabel}
              value={checkOut ? formatShort(checkOut) : "Add dates"}
              active={panel === "dates"}
              onClick={() => setPanel(panel === "dates" ? null : "dates")}
            />

            <span className="hidden h-10 w-px shrink-0 bg-ink/10 lg:block" />

            <Field
              icon={<UserRound size={17} />}
              label={conf.guestLabel}
              value={`${guestTotal} guest${guestTotal !== 1 ? "s" : ""}, ${
                guests.rooms
              } room${guests.rooms !== 1 ? "s" : ""}`}
              active={panel === "guests"}
              onClick={() => setPanel(panel === "guests" ? null : "guests")}
            />

            {/* Search button — idle → spinner → check */}
            <motion.button
              type="button"
              onClick={handleSearch}
              whileHover={{ scale: status === "idle" ? 1.04 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.96 : 1 }}
              className={`relative ml-1 flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl px-6 font-bold text-white shadow-pill transition-colors lg:h-14 lg:w-14 lg:px-0 ${
                status === "done"
                  ? "bg-olive-500"
                  : "bg-ocean-700 hover:bg-ocean-800"
              }`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {status === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <Search size={20} />
                    <span className="lg:hidden">Search</span>
                  </motion.span>
                )}
                {status === "searching" && (
                  <motion.span
                    key="searching"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 size={20} className="animate-spin" />
                    <span className="lg:hidden">Searching…</span>
                  </motion.span>
                )}
                {status === "done" && (
                  <motion.span
                    key="done"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 480, damping: 22 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={22} strokeWidth={3} />
                    <span className="lg:hidden">Done</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* business toggle */}
        <div className="mt-1 flex items-center gap-3 px-4 pb-1 pt-2">
          <span className="text-[13px] font-semibold text-ink/50">
            Search for:
          </span>
          <button
            type="button"
            onClick={() => {
              const next = !business;
              setBusiness(next);
              showToast(
                next ? "Business trip mode on" : "Business trip mode off",
                "info"
              );
            }}
            className="flex items-center gap-2"
          >
            <span
              className={`relative h-5 w-9 rounded-full transition-colors ${
                business ? "bg-ocean-700" : "bg-ink/15"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${
                  business ? "left-[18px]" : "left-0.5"
                }`}
              />
            </span>
            <span className="text-[13px] font-semibold text-ink/70">
              Business trip
            </span>
          </button>
        </div>
      </motion.div>

      {/* Popovers */}
      <AnimatePresence>
        {panel === "destination" && (
          <div className="absolute left-0 top-[calc(100%+12px)] z-40">
            <DestinationPicker
              selected={destination}
              onSelect={handleDestinationPick}
            />
          </div>
        )}
        {panel === "dates" && (
          <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-40 mx-auto max-w-2xl">
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={handleDatePick}
              viewYear={view.year}
              viewMonth={view.month}
              onNavigate={(delta) =>
                setView((v) => addMonths(v.year, v.month, delta))
              }
            />
          </div>
        )}
        {panel === "guests" && (
          <div className="absolute right-0 top-[calc(100%+12px)] z-40">
            <GuestSelector
              guests={guests}
              onChange={setGuests}
              onDone={handleGuestsDone}
            />
          </div>
        )}
      </AnimatePresence>

      <Toast toast={toast} />
    </div>
  );
}
