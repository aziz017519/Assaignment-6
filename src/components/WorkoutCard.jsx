import Image from "next/image";
import Link from "next/link";
import TagPills from "./TagPills";
import WorkoutStats from "./WorkoutStats";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-lime/60"
    >
      <div className="relative h-48 shrink-0 overflow-hidden bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <TagPills tags={workout.muscleGroups} />
        <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1 mb-5 text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto border-t border-[#20242e] pt-4">
          <WorkoutStats
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
