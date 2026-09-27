import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

// Server Component — সার্ভারেই API থেকে ডাটা আনে
export default async function Library() {
  const workouts = await getWorkouts();

  if (!workouts.length) {
    return <p className="py-16 text-center text-muted">No workouts found right now.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
