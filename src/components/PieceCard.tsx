"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { DancePiece } from "@/lib/types";
import { hasRealContent } from "@/lib/data";
import { sitePath } from "@/lib/sitePath";

type PieceCardProps = {
  piece: DancePiece;
  cover?: string;
};

export function PieceCard({ piece, cover }: PieceCardProps): React.JSX.Element {
  return (
    <motion.article
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative overflow-hidden bg-zinc-900/60 backdrop-blur-sm"
    >
      <Link href={`/piece/${piece.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          {cover ? (
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${sitePath(cover)})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>
        <div className="space-y-2 p-5">
          {hasRealContent(piece.company) ? (
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{piece.company}</p>
          ) : null}
          <h3 className="text-2xl font-medium text-zinc-50">{piece.title}</h3>
          {hasRealContent(piece.program_note) ? (
            <p className="line-clamp-2 text-sm text-zinc-300">{piece.program_note}</p>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}
