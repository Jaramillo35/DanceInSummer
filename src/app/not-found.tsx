import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <section className="-mx-4 md:-mx-6 bg-white/5 backdrop-blur-sm px-8 py-8 text-center">
      <h1 className="text-3xl text-zinc-100">Piece not found</h1>
      <p className="mt-3 text-zinc-400">This movement page is not available yet.</p>
      <Link href="/event" className="mt-5 inline-block text-amber-200 hover:text-amber-100">
        Back to event overview
      </Link>
    </section>
  );
}
