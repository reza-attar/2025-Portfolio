import type { Config } from "tailwindcss";

export default {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    colors: {
      transparent: "rgba(0, 0, 0, 0%)",
      onyx: "#181818",
      gray: {
        dark: "#808080",
        medium: "rgba(128, 128, 128, 0.5)",
        light: "#C5C5C5",
      },
      blue: "rgba(63, 100, 234, 0.43)",
      red: "rgba(233, 63, 64, 0.43)",
      yellow: "rgba(255, 184, 0, 0.43)",
      white: {
        DEFAULT: "hsl(var(--white))",
        faint: "#F3F3F3",
      },
      black: {
        "10": "#1F1F1F",
        "50": "#0D0D0D",
        DEFAULT: "#0D0D0D",
      },
      card: {
        border: "hsl(var(--card-border))",
        background: "hsl(var(--card-background))",
      },
      widget: {
        background: "hsl(var(--widget-background))",
      },
      nav: {
        background: "hsl(var(--nav-background))",
        border: "hsl(var(--nav-border))",
      },

      background: "hsl(var(--main-bg))",
    },
    fontSize: {
      "10": "10px",
      "11": "11px",
      "12": "12px",
      "14": "14px",
      "15": "15px",
      "16": "16px",
      "18": "18px",
      "20": "20px",
      "24": "24px",
      "32": "32px",
      "40": "40px",
      "48": "48px",
      "60": "60px",
      "80": "80px",
    },
    fontFamily: {
      inter: ["var(--font-inter)", "Inter", "sans-serif"],
      nanum: ["var(--font-nanum)"],
    },
    extend: {
      borderRadius: {
        "4xl": "32px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(90deg, rgba(26,26,26,1) 0%, rgba(19,19,19,1) 100%)",
      },
      boxShadow: {
        inner: "0 -1px 0px 0px rgba(0, 0, 0, 3)",
      },
      dropShadow: {
        button: "0px 7px 4px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          strong: "var(--ink-strong)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
          label: "var(--ink-label)",
        },
        tag: {
          DEFAULT: "var(--tag-bg)",
          fg: "var(--tag-fg)",
          border: "var(--tag-border)",
        },
        panel: {
          DEFAULT: "var(--panel)",
          border: "var(--panel-border)",
        },
        hdr: {
          DEFAULT: "var(--hdr-bg)",
          border: "var(--hdr-border)",
        },
        sep: "var(--sep)",
        divider: "var(--divider)",
        "card-hover": "var(--card-hover-border)",
        dash: "var(--dash)",
        field: {
          DEFAULT: "var(--field)",
          line: "var(--field-line)",
        },
        "win-line": "var(--win-line)",
        "nav-hover": "var(--nav-hover)",
        control: {
          DEFAULT: "var(--control)",
          fg: "var(--control-fg)",
          border: "var(--control-border)",
        },
        focus: "var(--focus-ring)",
        "shad-background": "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
