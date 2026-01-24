import Reactotron from 'reactotron-react-native'

if (__DEV__) {
  // Reactotron 초기화
  Reactotron.configure({
    name: 'Encore-FE',
    host: 'localhost', // 실제 기기에서는 Mac IP 주소 사용
  })
    .useReactNative({
      asyncStorage: false, // AsyncStorage 미사용 (expo-secure-store 사용 중)
      networking: {
        ignoreUrls: /symbolicate|logs|127\.0\.0\.1/,
      },
      editor: false, // VSCode 연동 비활성화
      errors: { veto: (stackFrame) => false }, // 모든 에러 표시
      overlay: false, // 화면 오버레이 비활성화
    })
    .connect()

  // 연결 성공 로그
  console.log('🚀 Reactotron Configured')

  // API 요청 자동 로깅
  const originalFetch = global.fetch
  global.fetch = async (...args) => {
    const [url, options] = args

    // Reactotron 자체 요청은 무시
    if (typeof url === 'string' && url.includes('localhost')) {
      return originalFetch(...args)
    }

    console.tron?.display({
      name: '🌐 API Request',
      preview: `${options?.method || 'GET'} ${url}`,
      value: { url, options },
      important: true,
    })

    try {
      const response = await originalFetch(...args)
      const clonedResponse = response.clone()

      let data
      try {
        data = await clonedResponse.json()
      } catch {
        data = await clonedResponse.text()
      }

      console.tron?.display({
        name: response.ok ? '✅ API Response' : '❌ API Error',
        preview: `${response.status} ${url}`,
        value: {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data,
        },
        important: !response.ok,
      })

      return response
    } catch (error) {
      console.tron?.error?.(error, '❌ Network Error')
      throw error
    }
  }

  // TypeScript 타입 확장
  console.tron = Reactotron
}

export default Reactotron
