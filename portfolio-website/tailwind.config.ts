import type { Config } from "tailwindcss";

export default {
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
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'opacity': '0.5',
            'transform': 'translateX(-100%)'
          },
          '50%': {
            'opacity': '1',
            'transform': 'translateX(100%)'
          },
        },
        'shine': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
