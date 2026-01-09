export const userKeys = {
  all: ['user'] as const,
  myInfo: (id: string) => [...userKeys.all, id] as const,
}
