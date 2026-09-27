// লোডিং অ্যানিমেশন — বারবেলের মত ঘুরতে থাকা রিং
export default function Loader({ label = "Loading workouts…" }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 py-24">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-lime" />
      <p className="font-display text-sm uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}
