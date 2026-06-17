import type { CollectionEntry } from 'astro:content'

const blogIndexFiles = import.meta.glob('/src/content/blog/*/index.{md,mdx}')

const indexPostDirs: string[] = Object.keys(blogIndexFiles)
  .map((key) => {
    const m = key.match(/\/src\/content\/blog\/([^/]+)\/index\.(md|mdx)$/)
    return m ? m[1] : null
  })
  .filter(Boolean) as string[]

export function getPostDir(post: CollectionEntry<'blog'>): string | undefined {
  const idx = post.id.lastIndexOf('/')
  if (idx !== -1) return post.id.slice(0, idx)
  if (indexPostDirs.includes(post.id)) return post.id
  return undefined
}

export function getPostId(post: CollectionEntry<'blog'>): string {
  const idx = post.id.lastIndexOf('/')
  const filePart = idx === -1 ? post.id : post.id.slice(idx + 1)
  return post.data.id || filePart
}

export function getPostUrl(post: CollectionEntry<'blog'>): string {
  const dir = getPostDir(post)
  const id = getPostId(post)
  if (dir) {
    return `/blog/${dir}/${id}`
  }
  return `/blog/${id}`
}
