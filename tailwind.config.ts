import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        disabled: "#BDBDBD",
        blue: "#418BCA",
        "blue-500": "#3f83f8",
        "blue-dark": "#2C6A9C",
        "white-500": "#EAF4FD",
        "cyan-500": "#06b6d4",
        "pink-500": "#e74694",
        "orange-500": "#ff8a4c",
        "teal-500": "#afecef",
        "lime-500": "#d9f99d",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops)) no-repeat",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops)) no-repeat",
      },
    },
  },
  plugins: [],
};
export default config;
