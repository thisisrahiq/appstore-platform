import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle.js";

export default function Home() {
  usePageTitle("Home | AppStore");

  return (
    <section className="hero min-h-[55vh] rounded-3xl glass-card border border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none" />
      <div className="hero-content text-center flex-col py-16 px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Discover apps you will love
        </h1>
        <p className="max-w-xl text-base-content/70 mt-4 text-lg">
          Trending picks, curated categories, and honest reviews — all in one modern AppStore experience.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link to="/apps" className="btn btn-primary btn-lg rounded-full px-8">
            Browse Apps
          </Link>
          <Link to="/about" className="btn btn-outline btn-lg rounded-full border-base-content/30">
            About the platform
          </Link>
        </div>
      </div>
    </section>
  );
}
