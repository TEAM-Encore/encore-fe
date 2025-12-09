import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OverlayProvider } from 'overlay-kit'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from '@/components/Toaster'
import { ReactQueryProvider } from './react-query.provider'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
          <BottomSheetModalProvider>
            {children}
            <Toaster />
          </BottomSheetModalProvider>
        </OverlayProvider>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  )
}
