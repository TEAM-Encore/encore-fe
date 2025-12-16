import type { SearchMusicalsParams } from 'api'

export const musicalKeys = {
  all: ['musical'] as const,
  searchMusicals: (params: SearchMusicalsParams) =>
    [...musicalKeys.all, 'searchMusicals', params] as const,
}
