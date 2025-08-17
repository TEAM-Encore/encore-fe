import { transform } from '@svgr/core'
import { program } from 'commander'
import * as fs from 'fs/promises'
import * as path from 'path'

const SVG_DIR = path.join(process.cwd(), 'assets/icons')
const COMPONENT_DIR = path.join(
  process.cwd(),
  'src/components/common/icons/svgs',
)

program
  .option('-c, --current-color', 'SVG 색상을 currentColor로 변환')
  .parse(process.argv)

const options = program.opts()

async function generateSvgComponents() {
  try {
    const inputDir = options.src
      ? path.resolve(process.cwd(), options.src)
      : SVG_DIR
    const outputDir = options.out
      ? path.resolve(process.cwd(), options.out)
      : COMPONENT_DIR

    await fs.mkdir(outputDir, { recursive: true })

    const files = await fs.readdir(inputDir)
    const svgFiles = files.filter((file) => file.endsWith('.svg'))

    const componentNames: string[] = []

    for (const file of svgFiles) {
      const componentName = path
        .basename(file, '.svg')
        .replace(/[^a-zA-Z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')

      const svgContent = await fs.readFile(path.join(inputDir, file), 'utf-8')

      const componentPath = path.join(outputDir, `${componentName}.tsx`)

      const fileExists = await fs
        .access(componentPath)
        .then(() => true)
        .catch(() => false)

      if (fileExists && !options.force) {
        console.log(
          `⚠️ ${componentName} 컴포넌트가 이미 존재합니다. 건너뜁니다.`,
        )
        continue
      }

      const componentCode = await transform(
        svgContent,
        {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          native: true,
          typescript: true,
          exportType: 'named',
          jsxRuntime: 'automatic',
          namedExport: componentName,
          ref: true,
          svgoConfig: {
            multipass: true,
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              {
                name: 'convertColors',
                params: {
                  currentColor: options.currentColor,
                },
              },
            ],
          },
        },
        {
          componentName,
        },
      )

      const prettier = await import('prettier')
      const formattedCode = await prettier.format(componentCode, {
        parser: 'typescript',
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        plugins: [],
      })

      await fs.writeFile(
        path.join(outputDir, `${componentName}.tsx`),
        formattedCode,
      )

      componentNames.push(componentName)
    }

    const indexPath = path.join(outputDir, 'index.ts')
    let existingContent = ''

    try {
      existingContent = await fs.readFile(indexPath, 'utf-8')
    } catch {
      existingContent = ''
    }

    if (!componentNames.length) {
      console.log('⚠️ 생성할 아이콘이 없습니다. 종료합니다.')
      return
    }

    const exportStatements = componentNames
      .map((name) => `export { ${name} } from './${name}'`)
      .join('\n')

    const existingExports = existingContent.split('\n').filter(Boolean)
    const newExports = exportStatements
      .split('\n')
      .filter((line) => !existingExports.includes(line))

    if (newExports.length > 0) {
      const updatedContent = [...existingExports, ...newExports, ''].join('\n')

      await fs.writeFile(indexPath, updatedContent)
      console.log(
        `${componentNames.map((name) => `✅ ${name} 추가됨`).join('\n')}`,
      )
    }

    console.log('✅ SVG 컴포넌트 생성 완료!')
  } catch (error) {
    console.error('에러 발생:', error)
  }
}

generateSvgComponents()
