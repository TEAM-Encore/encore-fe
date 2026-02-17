import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import type { ApplicationResponse, GetMyPointHistoryParams } from 'api'
import { api } from '@/api'
import { pointKeys } from './keys'

type MyBalanceResponse = Omit<ApplicationResponse, 'data'> & {
  data: {
    current_balance: number
  }
}

type MyPointHistoryResponse = Omit<ApplicationResponse, 'data'> & {
  data: {
    nextCursor: number
    content: {
      id: number
      change_amount: number
      balance_after: number
      description: string
      type: 'REVIEW_WRITE' | 'DAILY_LIKE'
      createdAt: string
    }
    pageable: {
      page_number: number
      page_size: number
    }
    total_elements: number
    total_pages: number
    last: boolean
    first: boolean
  }
}

export const pointQueries = {
  getMyBalance: () =>
    queryOptions<MyBalanceResponse>({
      queryKey: pointKeys.all,
      queryFn: () => api().getMyBalance() as Promise<MyBalanceResponse>,
    }),
  getMyPointHistory: () =>
    infiniteQueryOptions<MyPointHistoryResponse>({
      queryKey: pointKeys.all,
      queryFn: ({ pageParam = undefined }) =>
        api().getMyPointHistory(pageParam as GetMyPointHistoryParams),
      getNextPageParam: (lastPage) => lastPage?.data?.nextCursor,
      initialPageParam: undefined as number | undefined,
    }),
}
