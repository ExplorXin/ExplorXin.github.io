import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const sourceFiles = [
  'packages/pure/components/pages/PostPreview.astro',
  'packages/pure/components/pages/ArticleBottom.astro'
]

for (const sourceFile of sourceFiles) {
  const sourcePath = resolve(process.cwd(), sourceFile)
  const targetPath = resolve(process.cwd(), 'node_modules/astro-pure/components/pages', sourceFile.split('/').pop())

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing source file: ${sourcePath}`)
  }

  mkdirSync(dirname(targetPath), { recursive: true })
  copyFileSync(sourcePath, targetPath)
}
