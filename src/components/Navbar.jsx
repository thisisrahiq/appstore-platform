import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

const linkClass = ({ isActive }) =>
  `btn btn-ghost btn-sm rounded-full font-medium ${isActive ? "bg-primary/20 text-primary" : "text-base-content/80"}`;

export default function Navbar() {
  const { user, loading } = useAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch {
      toast.error("Could not sign out. Try again.");
    }
  }

  return (
    <header className="navbar bg-base-200/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-2 sm:px-4">
      <div className="navbar-start gap-1 sm:gap-2">
        <Link
          to="/"
          className="btn btn-ghost gap-2 text-lg font-display font-bold tracking-tight"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content text-sm">
            AS
          </span>
          <span className="hidden sm:inline">AppStore</span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex gap-1">
        <NavLink to="/apps" className={linkClass}>
          <span className="flex items-center gap-2">
            <HiOutlineSquares2X2 className="text-lg" />
            Apps
          </span>
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          My Profile
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </div>

      <div className="navbar-end gap-2">
        <div className="flex md:hidden gap-1">
          <NavLink to="/apps" className={linkClass}>
            Apps
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </div>

        {loading ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : user ? (
          <div className="flex items-center gap-2">
            <div
              className="tooltip tooltip-bottom before:max-w-[12rem]"
              data-tip={user.displayName || user.email || "Account"}
            >
              <img
                src={
                  user.photoURL ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.uid)}`
                }
                alt=""
                className="w-10 h-10 rounded-full ring-2 ring-primary/30 object-cover"
              />
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm gap-2 border-base-content/20"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-sm sm:btn-md rounded-full">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
