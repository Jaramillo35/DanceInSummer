"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { IndexedPhoto } from "@/lib/types";
import { Lightbox } from "@/components/Lightbox";
import { sitePath } from "@/lib/sitePath";

type GalleryProps = {
  photos: IndexedPhoto[];
};

export function Gallery({ photos }: GalleryProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="bg-white/4 backdrop-blur-sm p-8 text-zinc-300">
        Gallery coming soon.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.src}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.02 }}
            onClick={() => setActiveIndex(index)}
            className="group relative mb-4 block w-full overflow-hidden bg-zinc-900/60 text-left"
          >
            <Image
            src={sitePath(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              placeholder="blur"
              blurDataURL={photo.blurDataUrl}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
              loading={index < 3 ? "eager" : "lazy"}
            />
          </motion.button>
        ))}
      </div>
      {activeIndex !== null ? (
        <Lightbox
          photos={photos}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNext={() => setActiveIndex((prev) => ((prev ?? 0) + 1) % photos.length)}
          onPrev={() =>
            setActiveIndex((prev) => (((prev ?? 0) - 1 + photos.length) % photos.length))
          }
        />
      ) : null}
    </>
  );
}
