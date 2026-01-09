import { mutationOptions } from '@tanstack/react-query'
import type { UserPatchReq, ValidateUserNicknameParams } from 'api'
import { api } from '@/api'

export const userMutations = {
  patchUserInfo: () =>
    mutationOptions({
      mutationFn: (data: UserPatchReq) => api().patchUserInfo(data),
    }),
  validateUserNickname: () =>
    mutationOptions({
      mutationFn: (data: ValidateUserNicknameParams) =>
        api().validateUserNickname(data),
    }),
  deleteMyAccount: () =>
    mutationOptions({
      mutationFn: api().deleteMyAccount,
    }),
}
