import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, isFirebaseConfigured } from "../firebase/firebase.config.js";
import { usePageTitle } from "../hooks/usePageTitle.js";

const googleProvider = new GoogleAuthProvider();

function validatePassword(pw) {
  const errors = [];
  if (pw.length < 6) errors.push("At least 6 characters");
  if (!/[A-Z]/.test(pw)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(pw)) errors.push("One lowercase letter");
  return errors;
}

export default function Register() {
  usePageTitle("Register | AppStore");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    if (!auth) {
      toast.error("Firebase is not configured. Add VITE_FIREBASE_* env values.");
      return;
    }
    const issues = validatePassword(password);
    if (issues.length) {
      toast.error(`Password must include: ${issues.join(", ")}`);
      return;
    }
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, {
        displayName: name.trim(),
        photoURL: photoUrl.trim() || undefined,
      });
      toast.success("Account created!");
      navigate("/apps", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
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
      navigate("/apps", { replace: true });
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
        <h1 className="text-3xl font-display font-bold text-center">Sign up</h1>
        <p className="text-center text-base-content/60 text-sm mt-2">
          Password needs uppercase, lowercase, and 6+ characters.
        </p>
        {!isFirebaseConfigured && (
          <div className="alert alert-warning mt-4 text-sm">
            Firebase auth is not configured for this deployment yet.
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <label className="form-control w-full">
            <span className="label-text">Name</span>
            <input
              type="text"
              required
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
            <span className="label-text">Photo URL</span>
            <input
              type="url"
              placeholder="https://..."
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Password</span>
            <input
              type="password"
              required
              autoComplete="new-password"
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full rounded-full" disabled={busy}>
            {busy ? <span className="loading loading-spinner" /> : "Create account"}
          </button>
        </form>

        <div className="divider text-base-content/40">OR</div>

        <button
          type="button"
          className="btn btn-outline w-full rounded-full border-white/20 gap-2"
          onClick={handleGoogle}
          disabled={busy}
        >
          Google Login
        </button>

        <p className="text-center text-sm mt-8 text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
