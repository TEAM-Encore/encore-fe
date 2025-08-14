import { Toaster } from '@/components/Toaster'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { OverlayProvider } from 'overlay-kit'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <OverlayProvider>
      <BottomSheetModalProvider>
        {children}
        <Toaster />
      </BottomSheetModalProvider>
    </OverlayProvider>
  )
}
