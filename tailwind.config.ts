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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        pka_background: "#EFF3F6",
        pka_green: "#78F1C8",
        pka_green_light: "#C1FFEA",
        pka_blue: "#0A4A64",
        pka_blue2: "#33455A",
        pka_black: "#0A1200",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionDuration: {
        "1500": "1500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config;
