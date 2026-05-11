import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle.js";

export default function About() {
  usePageTitle("About | AppStore");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="rounded-3xl glass-card border border-white/10 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold">About AppStore</h1>
        <p className="mt-4 text-base-content/80 leading-relaxed">
          AppStore Platform is a student-built showcase for discovering apps by category, tracking
          trending titles, and leaving session-based reviews after installing. Authentication is
          powered by Firebase so your profile stays in sync across devices.
        </p>
        <h2 className="text-xl font-display font-semibold mt-8">Developer resources</h2>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-base-content/80">
          <li>React, Vite, and React Router for routing and layouts</li>
          <li>Tailwind CSS + DaisyUI for responsive, themeable UI</li>
          <li>Firebase Authentication (email/password and Google)</li>
          <li>Static JSON catalog — swap for an API when you are ready</li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/apps" className="btn btn-primary rounded-full">
            Browse catalog
          </Link>
          <a
            href="https://firebase.google.com/docs/auth"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline rounded-full border-white/20"
          >
            Firebase Auth docs
          </a>
        </div>
      </section>
    </div>
  );
}
