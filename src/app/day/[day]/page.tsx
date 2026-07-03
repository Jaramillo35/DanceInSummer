import { notFound } from "next/navigation";
import { DayNavigation } from "@/components/DayNavigation";
import { PieceCard } from "@/components/PieceCard";
import { DAY_LABELS, getPiecePhotos, getPiecesForDay } from "@/lib/data";
import type { DayKey } from "@/lib/types";

const DAYS = ["friday", "saturday", "sunday"] as const;

export function generateStaticParams(): Array<{ day: string }> {
  return DAYS.map((day) => ({ day }));
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}): Promise<React.JSX.Element> {
  const { day } = await params;
  if (!DAYS.includes(day as (typeof DAYS)[number])) {
    notFound();
  }

  const pieces = getPiecesForDay(day as DayKey);

  return (
    <div className="space-y-6">
      <section className="-mx-4 md:-mx-6 bg-white/5 backdrop-blur-sm px-7 py-7">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{day}</p>
        <h1 className="mt-2 text-4xl text-zinc-100">{DAY_LABELS[day as keyof typeof DAY_LABELS]}</h1>
      </section>
      <DayNavigation activeDay={day as (typeof DAYS)[number]} />
      <section className="grid gap-5 md:grid-cols-2">
        {pieces.map((piece) => (
          <PieceCard key={piece.id} piece={piece} cover={getPiecePhotos(piece.id)[0]?.src} />
        ))}
      </section>
    </div>
  );
}
