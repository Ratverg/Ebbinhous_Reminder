
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: 'rgb(var(--color-header) / <alpha-value>)',
        footer: 'var(--color-footer)',
        inputForm: 'var(--color-input-form)',

        brand: 'var(--color-brand)',

        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        surfaceMuted: 'rgb(var(--color-surface-muted) / <alpha-value>)',
        surfaceAlt: 'var(--color-surface-alt)',

        text: 'var(--color-text)',
        textSecondary: 'var(--color-text-secondary)',
        textMuted: 'var(--color-text-muted)',
        textInverse: 'var(--color-text-inverse)',

        border: 'var(--color-border)',
        borderFocus: 'var(--color-border-focus)',

        error: 'var(--color-error)',

        footer: 'var(--color-footer)',
        input: 'var(--color-input)',
      }
    },
  },
  plugins: [],
}



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           light: '#2072B1',   // Steel Blue
//           DEFAULT: '#2072B1', // Steel Blue
//           dark: '#2072B1'     // Steel Blue
//         },
//         mainBackGround: {
//           light: '#ffffff',   // White
//           DEFAULT: '#ffffff', // White
//           dark: '#ffffff'     // White
//         },
//         secondBackGround: {
//           light: '#F0F3F6',   // Alice Blue / Very Light Gray
//           DEFAULT: '#F0F3F6', // Alice Blue
//           dark: '#F0F3F6'     // Alice Blue
//         },
//         thirdBackGround: {
//           light: '#f8fafc',   // Slate-50 (Near White)
//           DEFAULT: '#f8fafc', // Slate-50 (Near White)
//           dark: '#f8fafc'     // Slate-50 (Near White)
//         },
//         mainFont: {
//           light: '#ffffff',   // White
//           DEFAULT: '#ffffff', // White
//           dark: '#ffffff'     // White
//         },
//         secondFont: {
//           light: '#3a5066',   // Slate Blue/Gray
//           DEFAULT: '#3a5066', // Slate Blue/Gray
//           dark: '#3a5066'     // Slate Blue/Gray
//         },
//         thirdFont: {
//           light: '#243850',   // Dark Navy Blue
//           DEFAULT: '#243850', // Dark Navy Blue
//           dark: '#243850'     // Dark Navy Blue
//         },
//         fourthFont: {
//           light: '#9EA6B3',   // Muted Grayish Blue
//           DEFAULT: '#9EA6B3', // Muted Grayish Blue
//           dark: '#9EA6B3'     // Muted Grayish Blue
//         },
//         fifthFont: {
//           light: '#769ec7',   // Soft Blue
//           DEFAULT: '#769ec7', // Soft Blue
//           dark: '#769ec7'     // Soft Blue
//         },
//         sixthFont: {
//           light: '#92bae3',   // Sky Blue
//           DEFAULT: '#92bae3', // Sky Blue
//           dark: '#92bae3'     // Sky Blue
//         },
//         seventhFont: {
//           light: '#94a4b9',   // Slate Gray/Blue (Slate-400)
//           DEFAULT: '#94a4b9',
//           dark: '#94a4b9'
//         },
//         eighthFont: {
//           light: '#6b7280',   // Gray-500
//           DEFAULT: '#6b7280',
//           dark: '#6b7280'
//         },
//         ninthFont: {
//           light: '#000000',   // Pure Black
//           DEFAULT: '#000000',
//           dark: '#000000'
//         },
//         tenthFont: {
//           light: '#f8fafc',   // Slate-50 (Near White)
//           DEFAULT: '#f8fafc',
//           dark: '#f8fafc'
//         },
//         borderCol: {
//           light: '#9ca3af',   // Gray-400
//           DEFAULT: '#9ca3af',
//           dark: '#9ca3af'
//         },
//         borderFocusCol: {
//           light: '#60a5fa',   // blue-400
//           DEFAULT: '#60a5fa',
//           dark: '#60a5fa'
//         },
//         twelfthFont: {
//           light: '#243850',   // Dark Navy Blue
//           DEFAULT: '#243850',
//           dark: '#243850'
//         },
//         errorFont: {
//           light: '#ff0000',   // Pure Red
//           DEFAULT: '#ff0000',
//           dark: '#ff0000'
//         },
//         inputBlockBG: {
//           light: '#f8fafc',   // Slate-50
//           DEFAULT: '#f8fafc',
//           dark: '#f8fafc'
//         },
//         footerBlockBG: {
//           light: '#0C2140',   // Deep Midnight Blue
//           DEFAULT: '#0C2140',
//           dark: '#0C2140'
//         }
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//       }
//     },
//   },
//   plugins: [],
// }