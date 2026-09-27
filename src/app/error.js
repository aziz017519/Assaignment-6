"use client";


export default function Error({ reset }) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
        Couldn&apos;t load workouts
      </h1>
      <p className="mt-2 text-sm text-muted">The workout server didn&apos;t answer. Check your connection and try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-full bg-lime px-6 py-2.5 text-xs font-bold text-ink transition hover:bg-lime-bright"
      >
        Try again
      </button>
    </section>
  );
}
