import Link from "next/link";

export const metadata = { title: "Page not found — FitLog" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-lime sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-white">
        Missed the rep
      </h1>
      <p className="mt-2 text-sm text-muted">
        This page doesn&apos;t exist. The bar&apos;s back in the rack — head to the library and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-lime px-6 py-2.5 text-xs font-bold text-ink transition hover:bg-lime-bright"
      >
        Go to workouts
      </Link>
    </section>
  );
}
