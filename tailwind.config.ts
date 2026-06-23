import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif, "Playfair Display")', 'Georgia', 'serif'],
        body: ['var(--font-body, "Lora")', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          950: '#0f0e0c',
          900: '#1a1410',
          850: '#2a2419',
        },
        amber: {
          950: '#0a0602',
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'amber-glow': '0 0 20px rgba(251, 146, 60, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
