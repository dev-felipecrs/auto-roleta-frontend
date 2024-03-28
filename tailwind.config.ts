import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'connect-button-box-shadow':
          'connectButtonBoxShadow 1.5s ease 0s infinite normal none running',
        'fade-in-left': 'fadeInLeft 200ms ease-in-out',
        show: 'show 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'show-with-moviment':
          'showWithMoviment 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        connectButtonBoxShadow: {
          '70%': {
            'box-shadow': '0 0 0 10px transparent',
          },
          '100%': {
            'box-shadow': '0 0 transparent',
          },
        },
        fadeInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        show: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        showWithMoviment: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
