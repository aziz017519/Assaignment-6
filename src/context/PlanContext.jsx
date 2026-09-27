"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:v1";

const PlanContext = createContext(null);

// Plan/Saved লিস্টে যা যা দরকার শুধু সেগুলোই রাখি
function pickWorkout(w) {
  return {
    id: w.id,
    name: w.name,
    image: w.image,
    equipment: w.equipment,
    duration: Number(w.duration) || 0,
    caloriesBurned: Number(w.caloriesBurned) || 0,
    rating: Number(w.rating) || 0,
    muscleGroups: w.muscleGroups ?? [],
  };
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);

  // পেজ লোড হলে localStorage থেকে ডাটা পড়া
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.plan)) setPlan(data.plan);
        if (Array.isArray(data.saved)) setSaved(data.saved);
      }
    } catch {
      // storage না পেলে খালি লিস্ট দিয়েই চলবে
    }
    setReady(true);
  }, []);

  // plan/saved বদলালে localStorage-এ সেভ
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch {
      // ignore
    }
  }, [plan, saved, ready]);

  const activeCount = plan.filter((w) => !w.done).length;
  const isPlanFull = activeCount >= PLAN_CAP;

  const isInPlan = (id) => plan.some((w) => w.id === id);
  const isSaved = (id) => saved.some((w) => w.id === id);

  function addToPlan(workout) {
    if (isInPlan(workout.id)) {
      toast.error(`${workout.name} is already in today's plan`);
      return;
    }
    if (isPlanFull) {
      toast.error(`Today's plan is capped at ${PLAN_CAP} lifts. Finish one first.`);
      return;
    }
    setPlan((prev) => [...prev, { ...pickWorkout(workout), done: false }]);
    toast.success(`Added ${workout.name} to today's plan`);
  }

  function saveForLater(workout) {
    if (isSaved(workout.id)) {
      toast.error(`${workout.name} is already saved`);
      return;
    }
    setSaved((prev) => [...prev, pickWorkout(workout)]);
    toast.success(`Saved ${workout.name} for later`);
  }

  function markAsDone(id) {
    const item = plan.find((w) => w.id === id);
    if (!item || item.done) return;
    setPlan((prev) => prev.map((w) => (w.id === id ? { ...w, done: true } : w)));
    toast.success(`${item.name} done. Nice work!`);
  }

  function removeFromPlan(id) {
    const item = plan.find((w) => w.id === id);
    setPlan((prev) => prev.filter((w) => w.id !== id));
    if (item) toast(`Removed ${item.name} from today's plan`, { icon: "🗑️" });
  }

  function removeFromSaved(id) {
    const item = saved.find((w) => w.id === id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    if (item) toast(`Removed ${item.name} from saved`, { icon: "🗑️" });
  }

  const totals = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((sum, w) => sum + w.duration, 0),
      calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [plan]
  );

  const value = {
    plan,
    saved,
    ready,
    totals,
    isPlanFull,
    isInPlan,
    isSaved,
    addToPlan,
    saveForLater,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
