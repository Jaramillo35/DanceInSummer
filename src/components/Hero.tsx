"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type HeroProps = {
  companies: string[];
};

function getFloatingPosition(index: number, total: number): { left: string; top: string } {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radiusX = 41;
  const radiusY = 30;
  const left = 50 + Math.cos(angle) * radiusX;
  const top = 52 + Math.sin(angle) * radiusY;
  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

export function Hero({ companies }: HeroProps): React.JSX.Element {
  return (
    <section className="relative min-h-[82vh] -mx-4 md:-mx-6">
      <div className="relative flex min-h-[82vh] flex-col items-center justify-center gap-8 overflow-hidden px-6 pb-10 pt-20 text-center md:px-14">
        {companies.map((company, index) => {
          const position = getFloatingPosition(index, companies.length);
          return (
            <motion.span
              key={company}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.7, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.03 },
                y: {
                  duration: 3 + (index % 5) * 0.4,
                  delay: index * 0.08,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
              className="pointer-events-none absolute z-0 rounded-full border border-white/15 bg-black/30 px-2 py-1 text-[10px] text-zinc-200 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs"
              style={position}
            >
              {company}
            </motion.span>
          );
        })}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl"
        >
          Dancing in Summer
        </motion.h1>
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
          className="relative z-10 max-w-xl text-lg text-zinc-200"
        >
          by Terpsichore Collective
        </motion.p>
        <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10">
          <Link
            href="/event"
            className="inline-flex rounded-full border border-amber-300/30 bg-amber-200/10 px-6 py-3 text-sm tracking-wide text-amber-100 transition hover:bg-amber-200/20"
          >
            Explore the Program
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
