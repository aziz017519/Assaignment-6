import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import TagPills from "@/components/TagPills";
import WorkoutActions from "@/components/WorkoutActions";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  return { title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog" };
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  // ভুল id হলে 404 পেজ
  if (!workout) notFound();

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <article className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[minmax(0,540px)_1fr] lg:gap-14">
      {/* বাম পাশ: ছবি */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-2 lg:sticky lg:top-28 lg:aspect-[540/710] lg:self-start">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover"
        />
      </div>

      {/* ডান পাশ: তথ্য */}
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">{workout.description}</p>

        <div className="mt-5">
          <TagPills tags={workout.muscleGroups} uppercase={false} />
        </div>

        <dl className="mt-7 divide-y divide-[#20242e] overflow-hidden rounded-2xl border border-line bg-surface">
          {specs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-6 py-3.5">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</dt>
              <dd className="text-right text-sm text-gray-100">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide text-white">Instructions</h2>
        <ol className="mt-4 space-y-3">
          {workout.instructions?.map((step, index) => (
            <li key={index} className="flex gap-3 text-sm leading-relaxed text-gray-300">
              <span className="font-display font-bold text-lime">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </article>
  );
}
