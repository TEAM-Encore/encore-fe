export const pointKeys = {
  all: ['point'] as const,
  history: () => [...pointKeys.all, 'history'] as const,
}
