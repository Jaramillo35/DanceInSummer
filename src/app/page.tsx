import Link from "next/link";
import { Hero } from "@/components/Hero";
import { DayNavigation } from "@/components/DayNavigation";

export default function Home(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <Hero />
      <section className="-mx-4 md:-mx-6 bg-white/4 p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl text-zinc-100">Performance Days</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Friday, Saturday, and Sunday performance pages.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/event"
              className="inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-zinc-100 transition hover:border-amber-200/65 hover:text-amber-100"
            >
              Enter Event Overview
            </Link>
            <a
              href="https://instagram.com/jarrashots3"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-amber-200/40 bg-amber-200/10 px-5 py-2 text-sm text-amber-100 transition hover:bg-amber-200/20"
            >
              Instagram / @jarrashots3
            </a>
          </div>
        </div>
        <DayNavigation />
      </section>
    </div>
  );
}
