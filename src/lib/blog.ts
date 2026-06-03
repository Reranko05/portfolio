import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '')
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = getSlugFromFilename(filename)
    const fullPath = path.join(BLOG_DIR, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      tags: (data.tags as string[]) || [],
      readingTime: data.readingTime as string,
      featured: (data.featured as boolean) || false,
      coverImage: data.coverImage as string | undefined,
    } satisfies BlogPost
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): { frontmatter: BlogPost; content: string } | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const frontmatter: BlogPost = {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) || [],
    readingTime: data.readingTime as string,
    featured: (data.featured as boolean) || false,
    coverImage: data.coverImage as string | undefined,
  }

  return { frontmatter, content }
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  return files.map(getSlugFromFilename)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured)
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts()
  const idx = posts.findIndex((p) => p.slug === slug)

  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  }
}
