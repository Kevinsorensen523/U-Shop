module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#007bff",
        "custom-gray": "#f6f6f6",
      },
      spacing: {
        128: "32rem",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
