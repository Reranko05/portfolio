export interface Project {
  slug: string
  name: string
  description: string
  longDescription: string
  language: string
  languageColor: string
  technologies: string[]
  githubUrl: string
  demoUrl?: string
  stars?: number
  forks?: number
  lastUpdated: string
  featured: boolean
  topics: string[]
}
