import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "#FFFFFF",
        brand: {
          50: "#E5EEDA",
          300: "#BDD299",
          500: "#83951C",
          700: "#7A9B57",
          900: "#455E14",
        },
      },
    },
  },
  plugins: [],
};
export default config;
