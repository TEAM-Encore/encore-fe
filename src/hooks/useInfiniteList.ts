import {
  keepPreviousData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query'
import type { PageableObject, SortObject } from 'api'
import { useMemo } from 'react'

type PaginationRO<T> = {
  first?: boolean
  last?: boolean
  size?: number
  content?: T[]
  number?: number
  sort?: SortObject
  numberOfElements?: number
  pageable?: PageableObject
  empty?: boolean
}

type CursorPaginationParams = {
  pageable?: PageableObject
  cursor?: number | string
}

type Options<T, P = CursorPaginationParams> = {
  key: string
  fn: (params: P) => Promise<CommonResponse<PaginationRO<T>>>
  params: P
  enabled?: boolean
}

export const useInfiniteList = <
  T,
  P extends CursorPaginationParams = CursorPaginationParams,
>({
  key,
  fn,
  params,
  enabled,
}: Options<T, P>) => {
  const query = useInfiniteQuery<CommonResponse<PaginationRO<T>>>({
    queryKey: [key, params],
    queryFn: ({ queryKey, pageParam }) => {
      const cursor = pageParam as string | number | undefined

      return fn({ ...(queryKey[1] as P), cursor })
    },
    gcTime: 0,
    enabled: enabled,
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data?.cursor ?? undefined
    },
    refetchOnWindowFocus: false,
    refetchInterval: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  })

  const rows = useMemo(() => {
    if (!query.data) return []

    return query.data.pages.flatMap((v) => v.data?.content) || []
  }, [query.data])

  return {
    rows,
    ...query,
  }
}
