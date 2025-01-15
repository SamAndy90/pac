import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        pka_background: "#EFF3F6",
        pka_green: "#78F1C8",
        pka_green_light: "#C1FFEA",
        pka_blue: "#0A4A64",
        pka_blue2: "#33455A",
        pka_black: "#0A1200",
      },
      fontFamily: {
        lodrian: ["var(--font-lodrina)"],
        avenir: ["var(--font-avenir)"],
        avenirThin: ["var(--font-avenir-thin)"],
        avenirBold: ["var(--font-avenir-bold)"],
        inter: ["var(--font-inter)"],
        roboto: ["var(--font-roboto)"],
        averia: ["var(--font-averia)"],
        thunder: ["var(--font-thunder-variable)"],
        garamond: ["var(--font-garamond)"],
        garamond_2: ["var(--font-cormorant_garamond)"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      transitionDuration: {
        "1500": "1500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config;
