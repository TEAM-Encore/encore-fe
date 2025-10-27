import { execSync } from 'child_process'
import path from 'path'
import { generateApi } from 'swagger-typescript-api'
import 'dotenv/config'

;(async () => {
  const remoteUrl = `${process.env.EXPO_PUBLIC_API_HOST}/v3/api-docs`
  const localFilePath = path.resolve(process.cwd(), './swagger.json')

  console.log(`${remoteUrl} 에서 swagger.json 파일을 다운로드 하는중 ...🚚`)
  try {
    execSync(`curl -s "${remoteUrl}" -o "${localFilePath}"`, {
      stdio: 'inherit',
    })
    console.log('다운로드가 완료되었습니다! 🎉')
  } catch (error) {
    console.error('다운로드에 실패했습니다. 오류 내용:', error)
    process.exit(1)
  }

  await generateApi({
    fileName: 'api_sdk.ts',
    input: localFilePath,
    output: path.resolve(process.cwd(), './codegen/__generated__'),
    extractRequestBody: true,
    extractResponseBody: true,
    extractEnums: true,
    extractRequestParams: true,
    unwrapResponseData: true,
    generateRouteTypes: false,
    extractResponseError: true,
    generateUnionEnums: true,
  })
})()
