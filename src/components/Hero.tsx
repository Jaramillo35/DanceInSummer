"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero(): React.JSX.Element {
  return (
    <section className="relative min-h-[82vh] -mx-4 md:-mx-6">
      <div className="relative flex min-h-[82vh] flex-col items-center justify-center gap-8 px-6 pb-10 pt-20 text-center md:px-14">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl"
        >
          Dancing in Summer
        </motion.h1>
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
          className="max-w-xl text-lg text-zinc-200"
        >
          by Terpsichore Collective
        </motion.p>
        <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
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
