import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OverlayProvider } from 'overlay-kit'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from '@/components/Toaster'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5분
    },
  },
})

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
          <BottomSheetModalProvider>
            {children}
            <Toaster />
          </BottomSheetModalProvider>
        </OverlayProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
