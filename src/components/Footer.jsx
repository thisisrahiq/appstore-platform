import { Link } from "react-router-dom";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-200/90 border-t border-white/5 text-base-content p-10 gap-6">
      <nav className="grid grid-flow-col gap-6 md:gap-10 text-sm">
        <a href="#" className="link link-hover opacity-80">
          Terms of Service
        </a>
        <a href="#" className="link link-hover opacity-80">
          Privacy Policy
        </a>
        <Link to="/about" className="link link-hover opacity-80">
          Developer Resources
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4 text-xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
            aria-label="X"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </nav>
      <aside>
        <p className="text-sm opacity-60">
          © {new Date().getFullYear()} AppStore Platform · Assignment showcase
        </p>
        <p className="text-sm opacity-50 mt-1">
          Developed by{" "}
          <a
            href="https://www.rahiq.dev/"
            target="_blank"
            rel="noreferrer"
            className="link link-hover opacity-80 hover:opacity-100 hover:text-primary transition-colors"
          >
            Rahiq
          </a>
        </p>
      </aside>
    </footer>
  );
}
