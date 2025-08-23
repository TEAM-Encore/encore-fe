export const colors = {
  primary: {
    '01': '#FFF8DB',
    '02': '#FFF1BB',
    '03': '#FEE892',
    '04': '#FFDD56',
  },
  gray: {
    '01': '#FBFBFB',
    '02': '#F7F7F7',
    '03': '#F2F2F2',
    '04': '#DFDFDF',
    '05': '#C1C1C1',
    '06': '#A5A5A5',
    '07': '#8B8B8B',
    '08': '#6F6F6F',
    '09': '#3D3D3D',
    '10': '#333333',
    '11': '#242424',
    '12': '#171717',
  },
  sub: {
    alert: '#FF692D',
    black: '#000000',
    white: '#FFFFFF',
  },
} as const

export type ColorKeys = keyof typeof colors
export type PrimaryColorKeys = keyof typeof colors.primary
export type GrayColorKeys = keyof typeof colors.gray
export type SubColorKeys = keyof typeof colors.sub

export const flattenColorKeys = (() => {
  const keys: string[] = []

  Object.entries(colors).forEach(([key, values]) => {
    Object.keys(values).forEach((colorKey) => {
      keys.push(`${key}-${colorKey}`)
    })
  })

  return keys
})()
