import { FaStar, FaRegStar } from "react-icons/fa";

export function StarRow({ value, max = 5, size = "md" }) {
  const cls = size === "sm" ? "text-sm" : "text-lg";
  return (
    <div className={`flex gap-0.5 text-warning ${cls}`} aria-label={`${value} of ${max} stars`}>
      {Array.from({ length: max }, (_, i) =>
        i < Math.round(value) ? (
          <FaStar key={i} className="drop-shadow-sm" />
        ) : (
          <FaRegStar key={i} className="opacity-40" />
        )
      )}
    </div>
  );
}

export function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-2" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`btn btn-sm btn-circle ${value >= n ? "btn-warning text-warning-content" : "btn-ghost border border-base-content/20"}`}
          onClick={() => onChange(n)}
          aria-pressed={value === n}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
