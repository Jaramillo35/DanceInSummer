import Link from "next/link";
import { DAY_LABELS } from "@/lib/data";

const DAYS = ["friday", "saturday", "sunday"] as const;

type DayNavigationProps = {
  activeDay?: (typeof DAYS)[number];
};

export function DayNavigation({ activeDay }: DayNavigationProps): React.JSX.Element {
  return (
    <nav aria-label="Program days" className="grid gap-3 md:grid-cols-3">
      {DAYS.map((day) => {
        const active = day === activeDay;
        return (
          <Link
            key={day}
            href={`/day/${day}`}
            className={`border-b-2 p-4 transition ${
              active
                ? "border-amber-200/70 bg-amber-200/8 text-amber-100"
                : "border-transparent bg-white/4 hover:bg-white/7 hover:border-white/20 text-zinc-300"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              {day}
            </p>
            <p className="mt-1 text-lg text-zinc-100">{DAY_LABELS[day]}</p>
          </Link>
        );
      })}
    </nav>
  );
}
