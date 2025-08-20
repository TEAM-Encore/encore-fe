import { flattenColorKeys } from '@/styles/color'
import { fontSize } from '@/styles/fontSize'
import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// 중첩된 색상 키들을 평면화

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
