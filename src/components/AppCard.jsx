import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function formatDownloads(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function AppCard({ app, showDownloads = false }) {
  return (
    <Link
      to={`/app/${app.id}`}
      className="group card glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
    >
      <figure className="aspect-square relative overflow-hidden">
        <img
          src={app.thumbnail}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-transparent to-transparent" />
      </figure>
      <div className="card-body p-4 gap-2">
        <h3 className="card-title text-base font-display text-base-content line-clamp-1">
          {app.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <FaStar className="text-warning shrink-0" aria-hidden />
          <span>{app.rating.toFixed(1)}</span>
          {showDownloads && (
            <>
              <span className="opacity-40">·</span>
              <span>{formatDownloads(app.downloads)} downloads</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
