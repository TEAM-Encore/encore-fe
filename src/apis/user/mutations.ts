import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserLoginReq, UserPatchReq, UserSignupReq } from 'api'
import { api } from '@/api'
import { deleteToken, saveToken } from '@/lib/storage'
import { userKeys } from './keys'

/**
 * 회원가입 / 프로필 생성
 * OAuth 로그인 후 프로필 정보 입력 시 사용
 */
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: UserSignupReq) => api().signup(data),
  })
}

/**
 * 로그인
 * Test 용도로 사용 (실제는 OAuth 사용)
 */
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserLoginReq) => api().login(data),
    onSuccess: async (response) => {
      // 토큰 저장
      if (response.data?.access_token) {
        await saveToken('accessToken', response.data.access_token)
      }

      // 사용자 정보 갱신
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

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
 * 로컬 토큰 삭제
 */
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await deleteToken('accessToken')
      await deleteToken('refreshToken')
    },
    onSuccess: () => {
      // 모든 쿼리 초기화
      queryClient.clear()
    },
  })
}
