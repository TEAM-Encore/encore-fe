import { Api } from 'api'
import { deleteToken, getToken } from './lib/storage'

async function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init)

  if (response.status === 401) {
    await deleteToken('accessToken')
    const { router } = await import('expo-router')
    router.replace('/login')
  }

  return response
}

let instance: Api<unknown>['api'] | null = null

/**
 * API 인스턴스 반환
 */
export function api(): Api<unknown>['api'] {
  if (instance) {
    return instance
  }

  const __instance = new Api({
    baseUrl: process.env.EXPO_PUBLIC_API_HOST,
    baseApiParams: {
      format: 'json',
      secure: true,
      // cache: 'no-store',
    },
    customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await customFetch(input, init)
      return response
    },
    securityWorker: async () => {
      const accessToken = await getToken('accessToken')
      if (accessToken) {
        return {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      }
      return {}
    },
  })

  instance = __instance.api as Api<unknown>['api']

  return instance
}
