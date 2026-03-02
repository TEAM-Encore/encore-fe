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
  next_cursor?: number
  content?: T[]
  hasNext?: boolean
}

type Options<T, P extends Params = Params> = {
  queryKey: string
  fn: (params: P) => Promise<CommonResponse<T> | InternalResponse<T>>
  params: Omit<P, 'cursor'>
  enabled?: boolean
  staleTime?: number
}

function getPagePayload<T>(page: unknown): InternalResponse<T> | undefined {
  if (!page || typeof page !== 'object') return undefined
  if ('data' in page && page.data && typeof page.data === 'object')
    return (page as CommonResponse<T>).data
  return page as InternalResponse<T>
}

export const useInfiniteList = <T, P extends Params = Params>({
  queryKey,
  fn,
  params,
  enabled = true,
  staleTime,
}: Options<T, P>) => {
  const query = useInfiniteQuery({
    queryKey: [queryKey, params],
    queryFn: ({ pageParam }) => fn({ ...params, cursor: pageParam } as P),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      const payload = getPagePayload<T>(lastPage)
      return payload?.nextCursor ?? payload?.next_cursor ?? undefined
    },
    enabled,
    staleTime,
  })

  const rows =
    query.data?.pages.flatMap(
      (page) => getPagePayload<T>(page)?.content ?? [],
    ) ?? []

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
