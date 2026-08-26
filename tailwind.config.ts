import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#244A1A",
        leaf: "#5E8D2A",
        lime: "#B9D84A",
        cream: "#FFF9E9",
        butter: "#FFF0C9",
        honey: "#EBAF32",
        cocoa: "#553010",
        berry: "#EA695D"
      },
      fontFamily: { display: ["var(--font-display)", "Georgia", "serif"] },
      boxShadow: { soft: "0 18px 50px rgba(65, 66, 19, .12)", card: "0 10px 30px rgba(82, 67, 22, .09)" },
      borderRadius: { organic: "36px 18px 36px 18px" }
    }
  },
  plugins: []
} satisfies Config;
