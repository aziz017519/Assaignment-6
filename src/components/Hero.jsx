import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-surface px-6 py-10 sm:px-12 sm:py-14 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">Workout Library</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and
            watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-lime px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-ink transition hover:bg-lime-bright"
          >
            <Dumbbell className="h-4 w-4" aria-hidden />
            Browse workouts
          </a>
        </div>

        <div className="mx-auto w-56 sm:w-72 lg:w-80">
          <Image
            src="/banner.png"
            alt="Anatomy figure working out on a preacher curl machine"
            width={334}
            height={334}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
