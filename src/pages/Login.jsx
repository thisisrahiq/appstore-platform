import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, isFirebaseConfigured } from "../firebase/firebase.config.js";
import { usePageTitle } from "../hooks/usePageTitle.js";

const googleProvider = new GoogleAuthProvider();

export default function Login() {
  usePageTitle("Login | AppStore");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/apps";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleEmailLogin(e) {
    e.preventDefault();
    if (!auth) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* env values.");
      return;
    }
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    if (!auth) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* env values.");
      return;
    }
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      if (err?.code !== "auth/popup-closed-by-user") {
        toast.error(err?.message || "Google sign-in failed");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-3xl glass-card border border-white/10 p-8 md:p-10 shadow-2xl">
        <h1 className="text-3xl font-display font-bold text-center">Login</h1>
        <p className="text-center text-base-content/60 text-sm mt-2">
          Access installs, reviews, and your profile.
        </p>
        {!isFirebaseConfigured && (
          <div className="alert alert-warning mt-4 text-sm">
            Firebase auth is not configured for this deployment yet.
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleEmailLogin}>
          <label className="form-control w-full">
            <span className="label-text">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full rounded-full" disabled={busy}>
            {busy ? <span className="loading loading-spinner" /> : "Login"}
          </button>
        </form>

        <div className="divider text-base-content/40">OR</div>

        <button
          type="button"
          className="btn btn-outline w-full rounded-full border-white/20 gap-2"
          onClick={handleGoogle}
          disabled={busy}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google Login
        </button>

        <p className="text-center text-sm mt-8 text-base-content/70">
          New here?{" "}
          <Link to="/register" className="link link-primary font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
