export const userKeys = {
  all: ['user'] as const,
  myInfo: (userId: string) => [...userKeys.all, userId] as const,
  setupComplete: () => [...userKeys.all, 'setupComplete'] as const,
}
