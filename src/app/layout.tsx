import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CollageBackground } from "@/components/CollageBackground";
import photoIndexData from "@/data/photoIndex.json";
import type { PhotoIndexEntry } from "@/lib/types";
import { sitePath } from "@/lib/sitePath";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dancing in Summer",
  description: "by Terpsichore Collective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const piecePhotoPools = (photoIndexData.pieces as PhotoIndexEntry[])
    .filter((p) => p.photos.length > 0)
    .map((p) =>
      p.photos.map((photo) => ({
        src: sitePath(photo.src),
        width: photo.width,
        height: photo.height,
      })),
    );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        {/* Full-page collage behind everything */}
        <CollageBackground piecePhotoPools={piecePhotoPools} />
        {/* Dark overlay so content stays readable */}
        <div className="fixed inset-0 -z-10 bg-black/40 pointer-events-none" />
        <div className="mx-auto flex min-h-full w-full max-w-[1400px] flex-col px-4 py-4 md:px-6 md:py-6">
          <header className="mb-6 -mx-4 md:-mx-6 -mt-4 md:-mt-6 flex items-center justify-between bg-white/5 px-5 py-4 backdrop-blur-md">
            <Link href="/" className="text-sm tracking-[0.18em] text-zinc-200">
              MARTIN JARAMILLO
            </Link>
            <nav className="flex items-center gap-4 text-sm text-zinc-300">
              <Link href="/event" className="hover:text-white">
                Event
              </Link>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <a
                href="https://instagram.com/jarrashots3"
                target="_blank"
                rel="noreferrer"
                className="text-amber-200 hover:text-amber-100"
              >
                @jarrashots3
              </a>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-8 -mx-4 md:-mx-6 -mb-4 md:-mb-6 bg-white/4 px-5 py-4 text-sm text-zinc-400">
            Photographer credit: Martin Jaramillo ·{" "}
            <a
              href="https://instagram.com/jarrashots3"
              target="_blank"
              rel="noreferrer"
              className="text-amber-200 hover:text-amber-100"
            >
              @jarrashots3
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
