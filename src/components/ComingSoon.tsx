type ComingSoonProps = {
  label?: string;
};

export function ComingSoon({ label = "Coming soon" }: ComingSoonProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-widest text-zinc-300">
      <span aria-hidden>●</span>
      <span>{label}</span>
    </div>
  );
}
