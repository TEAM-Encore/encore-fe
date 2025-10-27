import { Api } from 'api'

/**
 * 토큰 로직 추가 필요
 */
const api = <T>(fetchFunction = fetch): Api<T>['api'] => {
  const instance = new Api({
    baseUrl: process.env.EXPO_PUBLIC_API_HOST,
    baseApiParams: {
      format: 'json',
      secure: true,
      cache: 'no-store',
    },
    customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await fetchFunction(input, init)

      return response
    },
  })

  return instance.api
}

export { api }
