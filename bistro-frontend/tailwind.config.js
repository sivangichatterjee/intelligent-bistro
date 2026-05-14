/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#FAF7F2",
        surface: "#FFFFFF",
        ink: "#1A1A1A",
        muted: "#6B6B6B",
        accent: "#D64545",
        sage: "#7A8B6F",
        border: "#E8E2D5",
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
        serif: ["Fraunces_400Regular"],
        "serif-semibold": ["Fraunces_600SemiBold"],
        "serif-bold": ["Fraunces_700Bold"],
      },
    },
  },
  plugins: [],
};
