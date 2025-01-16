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
        thunder: ["var(--font-thunder-variable)"],
        avenir: ["var(--font-avenir)"],
        avenirThin: ["var(--font-avenir-thin)"],
        avenirBold: ["var(--font-avenir-bold)"],
        garamond: ["var(--font-garamond)"],
        roboto: ["var(--font-roboto)"],
        averia: ["var(--font-averia)"],
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
