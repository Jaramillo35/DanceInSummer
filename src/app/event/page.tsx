import { DayNavigation } from "@/components/DayNavigation";
import { PieceSearch } from "@/components/PieceSearch";
import { getPiecePhotos, getProgram } from "@/lib/data";

export default function EventPage(): React.JSX.Element {
  const pieces = getProgram();
  const covers = Object.fromEntries(
    pieces.map((piece) => [piece.id, getPiecePhotos(piece.id)[0]?.src]),
  );

  return (
    <div className="space-y-7">
      <section className="-mx-4 md:-mx-6 bg-white/5 backdrop-blur-sm px-7 py-7">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Event Overview</p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-50">Dancing in Summer</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Navigate by day or by piece through a movement archive shaped as an editorial
          performance document.
        </p>
      </section>
      <DayNavigation />
      <PieceSearch pieces={pieces} covers={covers} />
    </div>
  );
}
