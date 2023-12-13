module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    colors: {
      transparent: "transparent",
      //current: "#00000",
      white: "#ffffff",
      pxcolor: "#8CB0B8",
      red: "#e11d48",
      gray: {
        50: "#f9fafb",

        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        500: "#6b7280",
        400: "#9ca3af",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554",
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344",
      },
    },
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
    require("flowbite/plugin"),
  ],
};
