import { api } from '@/api'
import { deleteToken } from '@/lib/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserPatchReq } from 'api'
import { userKeys } from './keys'

/**
 * 프로필 수정
 */
export const usePatchUserInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserPatchReq) => api().patchUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

/**
 * 로그아웃
 * - 토큰 삭제
 * - 모든 캐시 초기화
 * - 사용 후 router.replace('/login') 필요
 */
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await deleteToken('accessToken')
      await deleteToken('refreshToken')
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
