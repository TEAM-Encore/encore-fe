import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { OverlayProvider } from 'overlay-kit'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from '@/components/Toaster'
import { ReactQueryProvider } from './react-query.provider'
import { UserProvider } from './user.provider'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <ReactQueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UserProvider>
          <OverlayProvider>
            <BottomSheetModalProvider>
              {children}
              <Toaster />
            </BottomSheetModalProvider>
          </OverlayProvider>
        </UserProvider>
      </GestureHandlerRootView>
    </ReactQueryProvider>
  )
}
