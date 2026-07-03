"use client";

import { motion } from "framer-motion";
import type { DancePiece } from "@/lib/types";
import { filterRealValues, hasRealContent } from "@/lib/data";

function formatList(values: string[]): string {
  return filterRealValues(values).join(", ");
}

export function MetadataPanel({ piece }: { piece: DancePiece }): React.JSX.Element {
  const rows = [
    ["Dance Title", piece.title],
    ["Company", piece.company],
    ["Choreographer", formatList(piece.choreographer)],
    ["Dancers", formatList(piece.dancers)],
    ["Music", formatList(piece.music)],
    ["Costumes", formatList(piece.costumes)],
    ["Performance Date", piece.performance_date],
    ["Venue", piece.venue],
  ].filter(([, value]) => hasRealContent(value));

  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-white/5 backdrop-blur-md p-5"
    >
      <h2 className="mb-5 text-sm uppercase tracking-[0.2em] text-zinc-400">Program Metadata</h2>
      <dl className="space-y-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-widest text-zinc-400">{label}</dt>
            <dd className="mt-1 text-zinc-100">{value}</dd>
          </div>
        ))}
      </dl>
    </motion.aside>
  );
}
