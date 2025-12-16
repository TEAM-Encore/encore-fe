import { useInfiniteQuery } from '@tanstack/react-query'

interface CursorBasedData {
  nextCursor?: number
  content?: unknown[]
}

interface UseInfiniteListProps<TParams, TData extends CursorBasedData> {
  queryKey: string[]
  fn: (params: TParams) => Promise<{ data?: TData }>
  params: (pageParam: number | undefined) => TParams
}

export const useInfiniteList = <TParams, TData extends CursorBasedData>({
  queryKey,
  fn,
  params,
}: UseInfiniteListProps<TParams, TData>) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const response = await fn(params(pageParam))
      return response.data
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  })
}
