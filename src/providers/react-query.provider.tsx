import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export function ReactQueryProvider({ children }: PropsWithStrictChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
