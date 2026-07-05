import Link from "next/link";
import { Hero } from "@/components/Hero";
import { DayNavigation } from "@/components/DayNavigation";
import { getParticipatingCompanies } from "@/lib/data";

export default function Home(): React.JSX.Element {
  const companies = getParticipatingCompanies();

  return (
    <div className="space-y-8">
      <Hero companies={companies} />
      <section className="-mx-4 md:-mx-6 bg-white/5 p-7">
        <h2 className="text-xl text-zinc-100">Participating Dance Companies</h2>
        <p className="mt-2 text-sm text-zinc-400">
          With gratitude to all companies and artists participating in this festival.
        </p>
        <ul className="mt-5 grid gap-2 text-sm text-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <li key={company} className="rounded-md bg-black/20 px-3 py-2">
              {company}
            </li>
          ))}
        </ul>
      </section>
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
