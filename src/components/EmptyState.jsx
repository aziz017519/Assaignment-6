import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">Nothing here yet</h3>
      <p className="mt-2 text-sm text-muted">Browse the library and add a lift to get today moving.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-lime px-6 py-2.5 text-xs font-bold text-ink transition hover:bg-lime-bright"
      >
        Go to workouts
      </Link>
    </div>
  );
}
