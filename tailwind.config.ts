import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'gray': '#222222',
      'gray-light': '#444444',
      'gray-lighter': '#707070',
      'blue': '#007acc',
      'orange': '#FF6600',
      'orange-dark': '#FF4500',
      'green': '#008080',
      'purple': '#800080'
    }
  },
  plugins: [],
}
export default config
