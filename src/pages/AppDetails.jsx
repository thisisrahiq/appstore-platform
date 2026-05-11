import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import appsData from "../data/apps.json";
import { useAuth } from "../providers/AuthProvider.jsx";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { StarPicker, StarRow } from "../components/StarRow.jsx";

function formatDownloads(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K+`;
  return `${n}+`;
}

export default function AppDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const app = useMemo(() => appsData.find((a) => a.id === id), [id]);

  const [installed, setInstalled] = useState(false);
  const [everInstalled, setEverInstalled] = useState(false);
  const [reviews, setReviews] = useState(() => app?.reviews ?? []);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    if (!app) return;
    setInstalled(false);
    setEverInstalled(false);
    setReviews([...app.reviews]);
    setReviewText("");
    setReviewRating(5);
  }, [id, app]);

  usePageTitle(app ? `${app.name} | AppStore` : "App | AppStore");

  if (!app) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-display font-bold">App not found</h1>
        <Link to="/apps" className="btn btn-link mt-4">
          Back to Apps
        </Link>
      </div>
    );
  }

  const canSubmitReview = everInstalled;

  function toggleInstall() {
    if (!installed) {
      setInstalled(true);
      setEverInstalled(true);
      toast.success(`Installed ${app.name}`);
    } else {
      setInstalled(false);
      toast.info(`Uninstalled ${app.name}. You can still leave reviews.`);
    }
  }

  function submitReview(e) {
    e.preventDefault();
    if (!canSubmitReview) {
      toast.error("Install the app first to submit a review.");
      return;
    }
    const text = reviewText.trim();
    if (!text) {
      toast.error("Please write a short comment.");
      return;
    }
    const name =
      user?.displayName || user?.email?.split("@")[0] || "user";
    setReviews((prev) => [
      ...prev,
      { user: name, rating: reviewRating, comment: text },
    ]);
    setReviewText("");
    setReviewRating(5);
    toast.success("Review posted!");
  }

  return (
    <article className="max-w-5xl mx-auto space-y-10">
      <div className="rounded-3xl overflow-hidden glass-card border border-white/10">
        <div className="relative h-48 sm:h-64 md:h-80">
          <img src={app.banner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/40 to-transparent" />
        </div>
        <div className="p-6 md:p-10 -mt-16 relative flex flex-col md:flex-row gap-8">
          <img
            src={app.thumbnail}
            alt=""
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl ring-4 ring-base-100 shadow-xl object-cover shrink-0"
          />
          <div className="flex-1 pt-2 md:pt-12">
            <p className="text-sm text-secondary font-medium">{app.category}</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold mt-1">{app.name}</h1>
            <p className="text-base-content/70 mt-2">{app.developer}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <StarRow value={app.rating} />
              <span className="text-sm text-base-content/60">
                {formatDownloads(app.downloads)} downloads
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className={`btn btn-lg rounded-full px-8 border-0 ${
                  installed ? "btn-error text-error-content" : "btn-success text-success-content"
                }`}
                onClick={toggleInstall}
              >
                {installed ? "Uninstall" : "Install"}
              </button>
              {!everInstalled && (
                <p className="text-sm text-base-content/60 self-center">
                  Install once to unlock reviews — you can review after uninstalling too.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="prose prose-invert max-w-none">
        <h2 className="text-xl font-display font-semibold text-base-content">About</h2>
        <p className="text-base-content/80 mt-2">{app.description}</p>
        <h3 className="text-lg font-display font-semibold mt-6 text-base-content">Features</h3>
        <ul className="list-disc pl-5 mt-2 text-base-content/80 space-y-1">
          {app.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl glass-card border border-white/10 p-6 md:p-8">
        <h2 className="text-xl font-display font-bold mb-6">Reviews</h2>

        <form onSubmit={submitReview} className="space-y-4 mb-10 p-4 rounded-2xl bg-base-200/50 border border-white/5">
          <p className="text-sm text-base-content/70">
            {canSubmitReview
              ? "Share your experience (session only — not saved to a database)."
              : "Install this app to submit your first review."}
          </p>
          <label className="form-control">
            <span className="label-text text-base-content/80">Rating (1–5)</span>
            <StarPicker value={reviewRating} onChange={setReviewRating} />
          </label>
          <label className="form-control">
            <span className="label-text text-base-content/80">Comment</span>
            <textarea
              className="textarea textarea-bordered bg-base-200 border-white/10 min-h-[100px]"
              placeholder="What did you like or want improved?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              disabled={!canSubmitReview}
            />
          </label>
          <button type="submit" className="btn btn-primary rounded-full" disabled={!canSubmitReview}>
            Submit Review
          </button>
        </form>

        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-base-content/50">No reviews yet. Be the first.</p>
          ) : (
            reviews.map((r, idx) => (
              <div
                key={`${r.user}-${idx}`}
                className="border-b border-white/5 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold">{r.user}</span>
                  <StarRow value={r.rating} size="sm" />
                </div>
                <p className="mt-2 text-base-content/80">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </article>
  );
}
