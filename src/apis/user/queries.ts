import { queryOptions } from '@tanstack/react-query'
import type { UserSignupReqProviderEnum } from 'api'
import { api } from '@/api'
import { userKeys } from './keys'

export const userQueries = {
  getLoginUrl: (provider: UserSignupReqProviderEnum) =>
    queryOptions({
      queryKey: userKeys.all,
      queryFn: () => api().getLoginUrl({ provider }),
      enabled: !!provider,
    }),
  getMyInfo: () =>
    queryOptions({
      queryKey: userKeys.myInfo(),
      queryFn: api().getMyInfo,
    }),
}
