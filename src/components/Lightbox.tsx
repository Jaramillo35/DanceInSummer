"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IndexedPhoto } from "@/lib/types";

type LightboxProps = {
  photos: IndexedPhoto[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function Lightbox({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: LightboxProps): React.JSX.Element {
  const touchStart = useRef<number | null>(null);
  const photo = photos[index];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current == null) return;
          const delta = event.changedTouches[0]?.clientX - touchStart.current;
          if (delta > 40) onPrev();
          if (delta < -40) onNext();
          touchStart.current = null;
        }}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 rounded-full border border-white/20 px-3 py-2 text-white"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-4 rounded-full border border-white/20 px-3 py-2 text-white"
          aria-label="Next image"
        >
          →
        </button>
        <motion.div
          key={photo?.src}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-6xl"
        >
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="h-auto max-h-[88vh] w-full rounded-xl object-contain"
              priority
            />
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
