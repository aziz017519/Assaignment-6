"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import WorkoutStats from "./WorkoutStats";

// My Plan পেজের একটা workout row
export default function PlanCard({ workout, onDone, onRemove }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-70" : ""
      }`}
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:h-20 sm:w-36">
        <Image src={workout.image} alt={workout.name} fill sizes="(min-width: 640px) 144px, 100vw" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">{workout.name}</h3>
          {workout.done && (
            <span className="rounded-full bg-lime-deep px-2 py-0.5 text-[11px] font-bold uppercase text-lime">Done</span>
          )}
        </div>
        <p className="mt-0.5 mb-2 text-xs font-semibold text-muted">{workout.equipment}</p>
        <WorkoutStats
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          accentIcons
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#2d313b] px-5 py-2 text-xs font-medium text-gray-200 transition hover:border-gray-400 hover:text-white"
        >
          View Details
        </Link>

        {onDone && (
          <button
            type="button"
            onClick={() => onDone(workout.id)}
            disabled={workout.done}
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2 text-xs font-bold text-ink transition hover:bg-lime-bright disabled:cursor-default disabled:bg-lime-deep disabled:text-lime"
          >
            <Check className="h-3.5 w-3.5" aria-hidden />
            {workout.done ? "Completed" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          aria-label={`Remove ${workout.name}`}
          className="grid h-8 w-8 place-items-center rounded-full border border-[#2d313b] text-muted transition hover:border-red-400 hover:text-red-400"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </li>
  );
}
