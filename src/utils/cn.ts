import { flattenColorKeys } from '@/styles/color'
import { fontSize } from '@/styles/fontSize'
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [...Object.keys(fontSize)],
        },
      ],
      'text-color': [
        {
          text: [...flattenColorKeys],
        },
      ],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
