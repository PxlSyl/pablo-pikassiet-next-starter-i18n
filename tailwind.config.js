const theme = require('./config/theme.json')

let font_base = Number(theme.fonts.font_size.base.replace('px', ''))
let font_scale = Number(theme.fonts.font_size.scale)
let h6 = font_base / font_base
let h5 = h6 * font_scale
let h4 = h5 * font_scale
let h3 = h4 * font_scale
let h2 = h3 * font_scale
let h1 = h2 * font_scale
let fontPrimary, fontSecondary

fontPrimary = 'var(--font-space-grotesk)'
  .replace(/\+/g, ' ')
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '')

fontSecondary = 'var(--font-signika)'
  .replace(/\+/g, ' ')
  .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, '')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [{ pattern: /^swiper-/ }],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,
        highlighted: theme.colors.default.text_color.highlighted,
        primary: theme.colors.default.theme_color.primary,
        secondary: theme.colors.default.theme_color.secondary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        'theme-light': theme.colors.default.theme_color.theme_light,
        'theme-dark': theme.colors.default.theme_color.theme_dark,
        darkmode: {
          text: theme.colors.darkmode.text_color.default,
          light: theme.colors.darkmode.text_color.light,
          dark: theme.colors.darkmode.text_color.dark,
          highlighted: theme.colors.darkmode.text_color.highlighted,
          primary: theme.colors.darkmode.theme_color.primary,
          secondary: theme.colors.darkmode.theme_color.secondary,
          body: theme.colors.darkmode.theme_color.body,
          border: theme.colors.darkmode.theme_color.border,
          'theme-light': theme.colors.darkmode.theme_color.theme_light,
          'theme-dark': theme.colors.darkmode.theme_color.theme_dark,
        },
      },
      fontSize: {
        base: font_base + 'px',
        h1: h1 + 'rem',
        'h1-sm': h1 * 0.8 + 'rem',
        h2: h2 + 'rem',
        'h2-sm': h2 * 0.8 + 'rem',
        h3: h3 + 'rem',
        'h3-sm': h3 * 0.8 + 'rem',
        h4: h4 + 'rem',
        h5: h5 + 'rem',
        h6: h6 + 'rem',
      },
      fontFamily: {
        primary: [fontPrimary],
        secondary: [fontSecondary],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-bootstrap-grid')({
      generateContainer: false,
      gridGutterWidth: '2rem',
      gridGutters: {
        1: '0.25rem',
        2: '0.5rem',
        3: '1rem',
        4: '1.5rem',
        5: '3rem',
      },
    }),
  ],
}
