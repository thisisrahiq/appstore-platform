import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config.js";
import { useAuth } from "../providers/AuthProvider.jsx";
import { usePageTitle } from "../hooks/usePageTitle.js";

export default function Profile() {
  usePageTitle("My Profile | AppStore");
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.displayName || "");
    setPhotoUrl(user.photoURL || "");
  }, [user?.uid, user?.displayName, user?.photoURL]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!auth.currentUser) return;
    setBusy(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
        photoURL: photoUrl.trim() || null,
      });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.message || "Update failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="rounded-3xl glass-card border border-white/10 p-8 md:p-10">
        <h1 className="text-3xl font-display font-bold">My Profile</h1>
        <p className="text-base-content/60 mt-2">View your account and update your public name and avatar.</p>

        <div className="flex flex-col sm:flex-row gap-6 mt-8 items-start">
          <img
            src={
              user?.photoURL ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.uid || "x")}`
            }
            alt=""
            className="w-28 h-28 rounded-2xl object-cover ring-2 ring-primary/30"
          />
          <div className="space-y-2 text-sm flex-1">
            <p>
              <span className="text-base-content/50">Name:</span>{" "}
              <span className="font-medium">{user?.displayName || "—"}</span>
            </p>
            <p>
              <span className="text-base-content/50">Email:</span>{" "}
              <span className="font-medium break-all">{user?.email || "—"}</span>
            </p>
            <p className="break-all">
              <span className="text-base-content/50">Photo URL:</span>{" "}
              <span className="font-mono text-xs opacity-80">{user?.photoURL || "—"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl glass-card border border-white/10 p-8 md:p-10">
        <h2 className="text-xl font-display font-bold">Update profile</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <span className="label-text">Name</span>
            <input
              type="text"
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text">Photo URL</span>
            <input
              type="url"
              className="input input-bordered w-full bg-base-200 border-white/10"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary rounded-full" disabled={busy}>
            {busy ? <span className="loading loading-spinner" /> : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
