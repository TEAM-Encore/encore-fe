import type { ThemeConfig } from 'tailwindcss/types/config'

export const fontSize: ThemeConfig['fontSize'] = {
  // Body
  'body-02': ['16px', '24px'],
  'body-long-02': ['16px', '28px'],
  'body-01': ['14px', '20px'],
  'body-long-01': ['14px', '22px'],
  caption: ['12px', '18px'],

  // Title / Display
  'display-05': ['40px', { lineHeight: '52px', fontWeight: 'bold' }],
  'display-04': ['36px', { lineHeight: '46px', fontWeight: 'bold' }],
  'display-03': ['32px', { lineHeight: '42px', fontWeight: 'bold' }],
  'display-02': ['28px', { lineHeight: '38px', fontWeight: 'bold' }],
  'display-01': ['24px', { lineHeight: '34px', fontWeight: 'bold' }],
  headline: ['20px', { lineHeight: '28px', fontWeight: 'bold' }],

  // Subhead
  'subhead-03': ['16px', { lineHeight: '22px', fontWeight: 'semibold' }],
  'subhead-long-03': ['16px', { lineHeight: '28px', fontWeight: 'medium' }],
  'subhead-02': ['14px', { lineHeight: '20px', fontWeight: 'semibold' }],
  'subhead-long-02': ['14px', { lineHeight: '24px', fontWeight: 'medium' }],
  'subhead-01': ['12px', { lineHeight: '18px', fontWeight: 'semibold' }],
} as const
