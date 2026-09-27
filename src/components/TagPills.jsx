// মাসল গ্রুপের ট্যাগ (CHEST, ARMS ...)
export default function TagPills({ tags = [], uppercase = true }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full bg-lime px-2.5 py-0.5 text-[11px] font-bold text-ink ${
            uppercase ? "uppercase tracking-wide" : ""
          }`}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
