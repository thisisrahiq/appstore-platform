import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle.js";

export default function NotFound() {
  usePageTitle("404 | AppStore");

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-base-100 px-6 text-center">
      <p className="text-8xl font-display font-black text-primary/30">404</p>
      <h1 className="text-2xl md:text-3xl font-display font-bold mt-4">This page drifted into the void</h1>
      <p className="text-base-content/60 mt-3 max-w-md">
        The route does not exist or was moved. Head back to the catalog or home to keep exploring apps.
      </p>
      <div className="flex flex-wrap gap-4 mt-10 justify-center">
        <Link to="/" className="btn btn-ghost rounded-full">
          Home
        </Link>
        <Link to="/apps" className="btn btn-primary rounded-full">
          Go to Apps
        </Link>
      </div>
    </div>
  );
}
