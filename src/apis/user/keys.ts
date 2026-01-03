import type {
  GetMyPostPaginationParams,
  ValidateUserNicknameParams,
} from 'api'

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  nicknameValidation: (params: ValidateUserNicknameParams) =>
    [...userKeys.all, 'nickname-validation', params] as const,
  myPosts: (params: GetMyPostPaginationParams) =>
    [...userKeys.all, 'my-posts', params] as const,
}
