"use client";

import { Bookmark, BookmarkCheck, CalendarCheck, CalendarPlus } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

// Details পেজের দুইটা বাটন — Context-এ ডাটা যোগ করে আর toast দেখায়
export default function WorkoutActions({ workout }) {
  const { ready, isInPlan, isSaved, isPlanFull, addToPlan, saveForLater } = usePlan();

  const inPlan = ready && isInPlan(workout.id);
  const saved = ready && isSaved(workout.id);
  const planDisabled = !ready || inPlan || isPlanFull;

  let planLabel = "Add to today's plan";
  if (inPlan) planLabel = "In today's plan";
  else if (ready && isPlanFull) planLabel = "Plan is full (5/5)";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={planDisabled}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-bright px-6 py-3 text-sm font-bold text-ink transition hover:bg-lime disabled:cursor-not-allowed disabled:opacity-60"
      >
        {inPlan ? <CalendarCheck className="h-4 w-4" aria-hidden /> : <CalendarPlus className="h-4 w-4" aria-hidden />}
        {planLabel}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={!ready || saved}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#3a3f4b] px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
