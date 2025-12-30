import { mutationOptions, queryOptions } from '@tanstack/react-query'
import type { UserPatchReq } from 'api'
import { api } from '@/api'
import { userKeys } from './keys'

export const userQueries = {
  getMyInfo: () =>
    queryOptions({
      queryKey: userKeys.all,
      queryFn: () => api(true).getMyInfo(),
    }),
  patchUserInfo: () =>
    mutationOptions({
      mutationFn: (data: UserPatchReq) => api(true).patchUserInfo(data),
    }),
}
