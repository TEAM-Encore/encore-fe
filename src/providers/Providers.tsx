import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { OverlayProvider } from 'overlay-kit'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from '@/components/Toaster'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <BottomSheetModalProvider>
          {children}
          <Toaster />
        </BottomSheetModalProvider>
      </OverlayProvider>
    </GestureHandlerRootView>
  )
}
