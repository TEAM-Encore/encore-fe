import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

export function FixedBottomContainer({ children }: PropsWithChildren) {
  return (
    <View className="absolute inset-x-0 bottom-0 px-5 py-4">{children}</View>
  )
}
