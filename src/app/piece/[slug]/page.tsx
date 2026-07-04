import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { MetadataPanel } from "@/components/MetadataPanel";
import {
  getArtistInfo,
  getPieceBySlug,
  getPiecePhotos,
  getProgram,
  getZipDownloadUrl,
  hasRealContent,
} from "@/lib/data";

export function generateStaticParams(): Array<{ slug: string }> {
  return getProgram().map((piece) => ({ slug: piece.id }));
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);
  if (!piece) {
    notFound();
  }
  const artistInfo = getArtistInfo(piece.id);
  const photos = getPiecePhotos(piece.id);
  const zipHref = getZipDownloadUrl(piece.id);
  const allPieces = getProgram();
  const index = allPieces.findIndex((entry) => entry.id === piece.id);
  const prevPiece = allPieces[index - 1];
  const nextPiece = allPieces[index + 1];

  return (
    <article className="space-y-7">
      <header className="-mx-4 md:-mx-6 bg-white/5 backdrop-blur-sm px-7 py-7">
        {hasRealContent(piece.company) ? (
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{piece.company}</p>
        ) : null}
        <h1 className="mt-2 text-5xl tracking-tight text-zinc-100">{piece.title}</h1>
        {hasRealContent(piece.program_note) ? (
          <p className="mt-3 max-w-4xl whitespace-pre-line text-zinc-300">{piece.program_note}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          {photos.length > 0 && zipHref ? (
            <a
              href={zipHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-amber-200/40 bg-amber-200/10 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/20"
            >
              Download photos ZIP
            </a>
          ) : null}
        </div>
      </header>

        {artistInfo ? (
          <section className="-mx-4 md:-mx-6 bg-white/5 backdrop-blur-sm px-7 py-7">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">About the Artists</p>
            <h2 className="mt-3 text-2xl text-zinc-100">{artistInfo.headline}</h2>
            <p className="mt-3 max-w-4xl text-zinc-300">{artistInfo.summary}</p>
          </section>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
          <Gallery photos={photos} />
          <MetadataPanel piece={piece} />
        </div>

      <nav className="grid gap-4 md:grid-cols-2" aria-label="Piece navigation">
        <div className="bg-white/4 backdrop-blur-sm p-4">
          {prevPiece ? (
            <Link href={`/piece/${prevPiece.id}`} className="text-zinc-200 hover:text-white">
              ← {prevPiece.title}
            </Link>
          ) : (
            <span className="text-zinc-500">Beginning of archive</span>
          )}
        </div>
        <div className="bg-white/4 backdrop-blur-sm p-4 text-right">
          {nextPiece ? (
            <Link href={`/piece/${nextPiece.id}`} className="text-zinc-200 hover:text-white">
              {nextPiece.title} →
            </Link>
          ) : (
            <span className="text-zinc-500">End of archive</span>
          )}
        </div>
      </nav>
    </article>
  );
}
