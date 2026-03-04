/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hspn: {
          bg: "#0b1020",
          panel: "#0f172a",
          line: "#1f2a44",
          text: "#e5e7eb",
          muted: "#9ca3af",
          brand: "#d71920"
        }
      },
      boxShadow: {
        panel: "0 10px 30px rgba(0,0,0,.35)"
      }
    }
  },
  plugins: []
};