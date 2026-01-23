import type { Config } from 'tailwindcss';

// Tailwind v4 supports config files; we only set what the project relies on.
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
};

export default config;
