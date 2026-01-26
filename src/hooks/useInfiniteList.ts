import { useInfiniteQuery } from '@tanstack/react-query'

type CommonResponse<T> = {
  timestamp?: string
  code?: number
  message?: string
  data?: InternalResponse<T>
}

type Params = { cursor?: number | string }

type InternalResponse<T> = {
  nextCursor?: number
  content?: T[]
  hasNext?: boolean
}

type Options<T, P extends Params = Params> = {
  queryKey: string
  fn: (params: P) => Promise<CommonResponse<T>>
  params: Omit<P, 'cursor'>
  enabled?: boolean
}

export const useInfiniteList = <T, P extends Params = Params>({
  queryKey,
  fn,
  params,
  enabled = true,
}: Options<T, P>) => {
  const query = useInfiniteQuery({
    queryKey: [queryKey, params],
    queryFn: ({ pageParam }) => fn({ ...params, cursor: pageParam } as P),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage?.data?.nextCursor ?? undefined,
    enabled,
  })

  const rows =
    query.data?.pages.flatMap((page) => page?.data?.content ?? []) ?? []

  const fetchNextPage = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }

  return {
    ...query,
    rows,
    fetchNextPage,
  }
}
