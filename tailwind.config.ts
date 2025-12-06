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
        background: "#0a0a0a",
        foreground: "#ededed",
        card: "#141414",
        "card-foreground": "#ededed",
        popover: "#141414",
        "popover-foreground": "#ededed",
        primary: "#22c55e",
        "primary-foreground": "#0a0a0a",
        secondary: "#1a1a1a",
        "secondary-foreground": "#ededed",
        muted: "#1a1a1a",
        "muted-foreground": "#737373",
        accent: "#1a1a1a",
        "accent-foreground": "#ededed",
        destructive: "#ef4444",
        "destructive-foreground": "#ededed",
        border: "#262626",
        input: "#262626",
        ring: "#22c55e",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
