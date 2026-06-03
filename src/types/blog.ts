export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
  featured: boolean
  coverImage?: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}
