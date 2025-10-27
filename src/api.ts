import { Api } from 'api'

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
export const api = ((): Api<unknown>['api'] => {
  if (instance) {
    return instance
  }

  const __instance = new Api({
    baseUrl: process.env.EXPO_PUBLIC_API_HOST,
    baseApiParams: {
      format: 'json',
      secure: true,
      cache: 'no-store',
    },
    customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await customFetch(input, init)
      return response
    },
  })

  instance = __instance.api as Api<unknown>['api']

  return instance
})()
