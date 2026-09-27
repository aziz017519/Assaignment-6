"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";

const sortOptions = {
  duration: { label: "Duration", key: "duration" },
  calories: { label: "Calories", key: "caloriesBurned" },
  rating: { label: "Rating", key: "rating" },
};

export default function MyPlanPage() {
  const { plan, saved, ready, totals, markAsDone, removeFromPlan, removeFromSaved } = usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const list = tab === "plan" ? plan : saved;
  
  const sortKey = sortOptions[sortBy].key;
  const sortedList = [...list].sort((a, b) => b[sortKey] - a[sortKey]);

  const metrics = [
    { label: "Exercises", value: totals.exercises, accent: true },
    { label: "Minutes", value: totals.minutes },
    { label: "Calories", value: totals.calories },
  ];

  const tabs = [
    { id: "plan", label: "Today's Plan", count: plan.length },
    { id: "saved", label: "Saved", count: saved.length },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-12">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white">My Plan</h1>
      <p className="mt-2 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics summary */}
      <div className="mt-8 grid grid-cols-3 rounded-2xl border border-line bg-surface p-3 sm:p-5">
        {metrics.map((m, i) => (
          <div key={m.label} className={`px-3 py-2 sm:px-5 ${i > 0 ? "border-l border-line" : ""}`}>
            <p className="text-xs text-muted">{m.label}</p>
            <p className={`mt-1 font-display text-3xl font-bold sm:text-4xl ${m.accent ? "text-lime" : "text-white"}`}>
              {ready ? m.value : 0}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + Sort */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="inline-flex self-start rounded-xl border border-line bg-surface p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-5 py-2 text-xs font-semibold transition ${
                tab === t.id ? "bg-surface-2 text-white" : "text-muted hover:text-white"
              }`}
            >
              {t.label}
              <span className="ml-1.5 text-[11px] text-muted">({ready ? t.count : 0})</span>
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 self-start text-xs text-muted sm:self-auto">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-line bg-surface py-2 pr-9 pl-4 text-xs text-white focus:border-lime focus:outline-none"
            >
              {Object.entries(sortOptions).map(([value, opt]) => (
                <option key={value} value={value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-muted" aria-hidden />
          </span>
        </label>
      </div>

     
      <div className="mt-6">
        {!ready ? (
          <Loader />
        ) : sortedList.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-4">
            {sortedList.map((workout) =>
              tab === "plan" ? (
                <PlanCard key={workout.id} workout={workout} onDone={markAsDone} onRemove={removeFromPlan} />
              ) : (
                <PlanCard key={workout.id} workout={workout} onRemove={removeFromSaved} />
              )
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
