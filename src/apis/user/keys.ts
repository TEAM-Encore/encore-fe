export const userKeys = {
  all: ['user'] as const,
  myInfo: () => [...userKeys.all, 'myInfo'] as const,
  setupComplete: () => [...userKeys.all, 'setupComplete'] as const,
}
