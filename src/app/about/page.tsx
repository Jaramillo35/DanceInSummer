export default function AboutPage(): React.JSX.Element {
  return (
    <section className="-mx-4 md:-mx-6 bg-white/5 backdrop-blur-sm px-8 py-8">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">About</p>
      <h1 className="mt-3 text-4xl text-zinc-100">Martin Jaramillo / @jarrashots3</h1>
      <p className="mt-4 max-w-3xl text-zinc-300">
        Photography has become my way of observing the world with intention. My background is
        in electrical and mechanical engineering, with a career in the automotive industry,
        where precision, problem solving, and attention to detail shape the way I approach the
        world. Alongside that analytical perspective, I have always been drawn to dance for its
        ability to express what words cannot, while my yoga practice has taught me to appreciate
        movement from a different perspective, one of presence, awareness, and stillness within
        motion. I am drawn to dance because it exists only for an instant, and my work is an
        attempt to preserve those fleeting moments where movement, emotion, and light come
        together.
      </p>
      <a
        href="https://instagram.com/jarrashots3"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex rounded-full border border-amber-200/40 bg-amber-200/10 px-5 py-2 text-sm text-amber-100 transition hover:bg-amber-200/20"
      >
        Follow on Instagram
      </a>
    </section>
  );
}
