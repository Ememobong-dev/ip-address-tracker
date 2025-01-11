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
        darkGray: "hsl(0, 0%, 59%)",
        veryDarkGray: "hsl(0, 0%, 17%)"

    
      },
    },
  },
  plugins: [],
} satisfies Config;
