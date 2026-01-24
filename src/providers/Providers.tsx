import { Toaster } from '@/components/Toaster'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { OverlayProvider } from 'overlay-kit'
import { Suspense } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ReactQueryProvider } from './react-query.provider'
import { UserProvider } from './user.provider'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UserProvider>
          <OverlayProvider>
            <BottomSheetModalProvider>
              <Suspense>{children}</Suspense>
              <Toaster />
            </BottomSheetModalProvider>
          </OverlayProvider>
        </UserProvider>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  )
}
