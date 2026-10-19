/**
 * Calendar-safe date helpers.
 * ISO dates ("2028-10-20") are parsed by hand as LOCAL calendar dates,
 * because `new Date("2028-10-20")` would be read as UTC and can land on the
 * wrong day in some timezones.
 */

export function parseISODate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(y, mo - 1, d, 0, 0, 0, 0); // local midnight
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
}

export type MilestoneState =
  | { kind: "future"; target: Date; msLeft: number }
  | { kind: "today"; target: Date }
  | { kind: "past"; target: Date }
  | { kind: "invalid" };

/** Decide what to show, using local calendar days (DST-safe). */
export function getMilestoneState(iso: string, now: Date = new Date()): MilestoneState {
  const target = parseISODate(iso);
  if (!target) return { kind: "invalid" };
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (startOfToday.getTime() === target.getTime()) return { kind: "today", target };
  if (now.getTime() < target.getTime()) {
    return { kind: "future", target, msLeft: target.getTime() - now.getTime() };
  }
  return { kind: "past", target };
}

/** Break milliseconds into days/hours/minutes/seconds. Never negative. */
export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function formatLongDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Years between two ISO dates, or null if not whole. Used for a friendly dev warning. */
export function wholeYearsBetween(startIso: string, endIso: string): number | null {
  const a = parseISODate(startIso);
  const b = parseISODate(endIso);
  if (!a || !b) return null;
  const years = b.getFullYear() - a.getFullYear();
  const shifted = new Date(a.getFullYear() + years, a.getMonth(), a.getDate());
  return shifted.getTime() === b.getTime() ? years : null;
}

/** Resolve "/images/x.jpg" or "images/x.jpg" against the site's base path. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\/+/, "");
  return base.endsWith("/") ? base + clean : base + "/" + clean;
}
