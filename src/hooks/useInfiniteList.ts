import { useInfiniteQuery } from '@tanstack/react-query'

interface TResponse<TItem> {
  data?: {
    nextCursor?: number
    content?: TItem[]
    hasNext?: boolean
  }
}

interface UseInfiniteListProps<
  TParams extends { cursor?: number },
  TItem,
  TData extends TResponse<TItem>,
> {
  queryKey: string[]
  fn: (params: TParams) => Promise<TData>
  params: Omit<TParams, 'cursor'>
}

export const useInfiniteList = <
  TParams extends { cursor?: number },
  TItem,
  TData extends TResponse<TItem>,
>({
  queryKey,
  fn,
  params,
}: UseInfiniteListProps<TParams, TItem, TData>) => {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const response = await fn({ ...params, cursor: pageParam } as TParams)
      return response.data
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  })

  const items: TItem[] =
    query.data?.pages.flatMap((page) => page?.content ?? []) ?? []

  const loadMore = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }

  return {
    ...query,
    items,
    loadMore,
  }
}
