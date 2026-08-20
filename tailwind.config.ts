import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#070a12',
          900: '#0b0f19',
          850: '#111726',
          800: '#172033',
          700: '#222f47',
          600: '#334466',
        },
      },
    },
  },
  plugins: [],
};
export default config;
