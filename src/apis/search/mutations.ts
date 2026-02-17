import { mutationOptions } from '@tanstack/react-query'
import { api } from '@/api'

export const searchMutations = {
  deleteRecentSearchLog: () =>
    mutationOptions({
      mutationFn: ({ name }: { name: string }) =>
        api().deleteRecentSearchLog(name),
    }),
}
