import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        appstore: {
          primary: "#6366f1",
          secondary: "#22d3ee",
          accent: "#f472b6",
          neutral: "#1e1b2e",
          "base-100": "#0f0d1a",
          "base-200": "#1a1625",
          "base-300": "#252136",
          info: "#38bdf8",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
    darkTheme: "appstore",
  },
};
