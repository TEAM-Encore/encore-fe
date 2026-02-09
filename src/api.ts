import { Api } from 'api'
import { router } from 'expo-router'
import { deleteToken, getToken } from './lib/storage'

function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(input, init)
}

let instance: Api<unknown>['api'] | null = null

/**
 * 토큰 로직 추가 필요
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
      if (response.status === 401) {
        await deleteToken('accessToken')
        router.replace('/login')
      }
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
