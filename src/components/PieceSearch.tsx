"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { DancePiece } from "@/lib/types";
import { PieceCard } from "@/components/PieceCard";

type PieceSearchProps = {
  pieces: DancePiece[];
  covers: Record<string, string | undefined>;
};

export function PieceSearch({ pieces, covers }: PieceSearchProps): React.JSX.Element {
  const [query, setQuery] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(pieces, {
        threshold: 0.35,
        keys: ["title", "company", "choreographer", "dancers"],
      }),
    [pieces],
  );

  const filtered = query.trim().length === 0 ? pieces : fuse.search(query).map((result) => result.item);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-400">
          Search title, company, choreographer, dancer
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movement archive..."
          className="w-full border-b border-white/12 bg-white/5 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-200/55 focus:outline-none backdrop-blur-sm"
        />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((piece) => (
          <PieceCard key={piece.id} piece={piece} cover={covers[piece.id]} />
        ))}
      </div>
    </div>
  );
}
