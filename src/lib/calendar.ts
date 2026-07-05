export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export type DayCell = {
  date: Date | null;
  key: string;
};

/**
 * Build a 6-row (42 cell) grid for a given month, week starting on Monday.
 * Empty cells (padding before day 1 / after last day) get `date: null`.
 */
export function buildMonthGrid(year: number, month: number): DayCell[] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // getDay(): 0=Sun..6=Sat -> convert to Mon=0..Sun=6
  const jsDay = firstOfMonth.getDay();
  const leadingBlanks = (jsDay + 6) % 7;

  const cells: DayCell[] = [];
  for (let i = 0; i < leadingBlanks; i++) {
    cells.push({ date: null, key: `blank-${year}-${month}-${i}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(year, month, d),
      key: `${year}-${month}-${d}`,
    });
  }
  return cells;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isBetween(day: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = day.getTime();
  return t > start.getTime() && t < end.getTime();
}

export function addMonths(year: number, month: number, delta: number) {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export function nightsBetween(start: Date | null, end: Date | null): number {
  if (!start || !end) return 0;
  const ms = end.getTime() - start.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function formatShort(date: Date | null): string {
  if (!date) return "Add dates";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
