/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-dim": "#131315",
        "surface-container-high": "#2a2a2c",
        "on-secondary": "#3c0091",
        "tertiary": "#c8c6c5",
        "primary-container": "#4d8eff",
        "outline-variant": "#424754",
        "primary": "#adc6ff",
        "on-primary": "#002e6a",
        "secondary": "#d0bcff",
        "on-surface-variant": "#c2c6d6",
        "background": "#131315",
        "surface-container-highest": "#353437",
        "outline": "#8c909f",
        "surface-bright": "#39393b",
        "surface": "#131315",
        "on-primary-container": "#00285d",
        "surface-container-low": "#1c1b1d",
        "surface-variant": "#353437",
        "surface-container": "#201f22",
        "surface-container-lowest": "#0e0e10",
        "on-surface": "#e5e1e4",
      },
      fontFamily: {
        sans: ['阿里妈妈数黑体', 'Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        body: ['阿里妈妈数黑体', 'Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['Space Grotesk', 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        label: ['Space Grotesk', 'monospace']
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem", 
        "xl": "0.5rem", 
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}