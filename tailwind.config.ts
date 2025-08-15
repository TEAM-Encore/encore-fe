import { zIndex } from './src/styles/zIndex'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      zIndex,
      fontFamily: {
        thin: ['Pretendard-Thin', 'sans-serif'],
        extralight: ['Pretendard-ExtraLight', 'sans-serif'],
        light: ['Pretendard-Light', 'sans-serif'],
        regular: ['Pretendard-Regular', 'sans-serif'],
        medium: ['Pretendard-Medium', 'sans-serif'],
        semibold: ['Pretendard-SemiBold', 'sans-serif'],
        bold: ['Pretendard-Bold', 'sans-serif'],
        extrabold: ['Pretendard-ExtraBold', 'sans-serif'],
        black: ['Pretendard-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
