import { Api } from 'api'

function customFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(input, init)
}

/**
 * 토큰 로직 추가 필요
 */
const api = <T>(fetchFn: typeof fetch = customFetch): Api<T>['api'] => {
  const instance = new Api({
    baseUrl: process.env.EXPO_PUBLIC_API_HOST,
    baseApiParams: {
      format: 'json',
      secure: true,
      cache: 'no-store',
    },
    customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await fetchFn(input, init)

      return response
    },
  })

  return instance.api
}

export { api }
