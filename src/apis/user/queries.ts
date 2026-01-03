import { queryOptions } from '@tanstack/react-query'
import type {
  GetMyPostPaginationParams,
  ValidateUserNicknameParams,
} from 'api'
import { api } from '@/api'
import { userKeys } from './keys'

export const userQueries = {
  /**
   * 내 정보 조회
   */
  me: () =>
    queryOptions({
      queryKey: userKeys.me(),
      queryFn: () => api().getMyInfo(),
    }),

  /**
   * 닉네임 가용성 확인
   * 회원가입 시 사용
   */
  nicknameValidation: (params: ValidateUserNicknameParams) =>
    queryOptions({
      queryKey: userKeys.nicknameValidation(params),
      queryFn: () => api().validateUserNickname(params),
      enabled: !!params.nickname && params.nickname.length >= 1,
    }),

  /**
   * 내가 작성한 게시글 목록
   */
  myPosts: (params: GetMyPostPaginationParams) =>
    queryOptions({
      queryKey: userKeys.myPosts(params),
      queryFn: () => api().getMyPostPagination(params),
    }),
}
