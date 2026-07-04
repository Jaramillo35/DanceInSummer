"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

type CollageBackgroundProps = {
  piecePhotoPools: string[][];
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const EMPTY: string[] = [];

export function CollageBackground({ piecePhotoPools }: CollageBackgroundProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const cachedRef = useRef<string[] | null>(null);

  const collagePhotos = useSyncExternalStore(
    () => () => {},
    () => {
      if (cachedRef.current === null) {
        cachedRef.current = shuffle(piecePhotoPools.map((pool) => pickRandom(pool)));
      }
      return cachedRef.current;
    },
    () => EMPTY,
  );

  if (collagePhotos.length === 0) return <></>;

  const cols = 4;
  const total = collagePhotos.length;
  const remainder = total % cols;
  const lastRowStart = total - remainder;

  return (
    <div
      className="fixed inset-0 -z-10 grid grid-cols-4"
      style={{ gridTemplateRows: `repeat(${Math.ceil(total / cols)}, 1fr)` }}
    >
      {collagePhotos.map((src, i) => {
        const isLastRow = remainder > 0 && i >= lastRowStart;
        let colSpan = 1;
        if (isLastRow) {
          const posInRow = i - lastRowStart;
          const baseSpan = Math.floor(cols / remainder);
          const extra = cols % remainder;
          colSpan = baseSpan + (posInRow < extra ? 1 : 0);
        }
        return (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={reducedMotion ? { opacity: 0.5 } : { opacity: [0, 0.5] }}
            transition={{ duration: 1.4, delay: i * 0.05, ease: "easeOut" }}
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
