import { Toaster } from '@/components/Toaster'

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
