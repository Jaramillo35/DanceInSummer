"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

export type CollagePhoto = {
  src: string;
  width: number;
  height: number;
};

type CollageBackgroundProps = {
  piecePhotoPools: CollagePhoto[][];
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

const EMPTY: CollagePhoto[] = [];

function getTileSpans(photo: CollagePhoto): { colSpan: number; rowSpan: number } {
  const aspectRatio = photo.width / photo.height;

  if (aspectRatio >= 1.45) {
    return { colSpan: 2, rowSpan: 1 };
  }
  if (aspectRatio <= 0.67) {
    return { colSpan: 1, rowSpan: 3 };
  }
  if (aspectRatio <= 0.85) {
    return { colSpan: 1, rowSpan: 2 };
  }
  return { colSpan: 1, rowSpan: 1 };
}

export function CollageBackground({ piecePhotoPools }: CollageBackgroundProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const cachedRef = useRef<CollagePhoto[] | null>(null);

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

  return (
    <div className="fixed inset-0 -z-10 grid auto-rows-[14vh] grid-flow-dense grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {collagePhotos.map((photo, i) => {
        const { colSpan, rowSpan } = getTileSpans(photo);
        return (
          <motion.div
            key={`${photo.src}-${i}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={
              reducedMotion
                ? { opacity: 0.5, scale: 1 }
                : {
                    opacity: [0, 0.56],
                    scale: [1.08, 1],
                  }
            }
            transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${photo.src})`,
              gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
              gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
