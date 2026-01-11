import { queryOptions } from '@tanstack/react-query'
import type { UserSignupReqProvider } from 'api'
import { api } from '@/api'
import { userKeys } from './keys'

export const userQueries = {
  getLoginUrl: (provider: UserSignupReqProvider) =>
    queryOptions({
      queryKey: userKeys.all,
      queryFn: () => api().getLoginUrl(provider),
      enabled: !!provider,
    }),
  getMyInfo: (userId: string) =>
    queryOptions({
      queryKey: userKeys.myInfo(userId),
      queryFn: api().getMyInfo,
    }),
  setupComplete: () =>
    queryOptions({
      queryKey: userKeys.setupComplete(),
      queryFn: api().setupComplete,
    }),
}
