import { Clock, Flame, Star } from "lucide-react";

// duration / calories / rating — আইকনসহ
export default function WorkoutStats({ duration, calories, rating, accentIcons = false }) {
  const iconClass = `h-3.5 w-3.5 ${accentIcons ? "text-lime" : "text-muted"}`;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-gray-300">
      <span className="flex items-center gap-1.5">
        <Clock className={iconClass} aria-hidden />
        {duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame className={iconClass} aria-hidden />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star className={iconClass} aria-hidden />
        {rating}
      </span>
    </div>
  );
}
