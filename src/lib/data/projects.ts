import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'zoqik',
    name: 'Zoqik',
    description: 'Redis-inspired in-memory database server built in C++ with full RESP protocol support.',
    longDescription: `Zoqik is a high-performance, in-memory key-value store written from scratch in C++. It implements the Redis Serialization Protocol (RESP), making it compatible with any Redis client library. The server handles concurrent connections via an epoll-based event loop, supports TTL-based key expiration, and implements a subset of Redis commands including GET, SET, DEL, EXPIRE, and INCR.

The project taught me deep lessons about socket programming, memory management, lock-free data structures, and the engineering trade-offs behind real-world database systems.`,
    language: 'C++',
    languageColor: '#f34b7d',
    technologies: ['C++17', 'RESP Protocol', 'epoll', 'CMake', 'Docker'],
    githubUrl: 'https://github.com/Reranko05/zoqik',
    lastUpdated: '2025-05-28',
    featured: true,
    topics: ['database', 'systems', 'c++', 'redis', 'networking'],
  },
  {
    slug: 'themis-fin-ai',
    name: 'ThemisFin AI',
    description: 'Enterprise audit and compliance automation platform powered by LLMs and rule-based engines.',
    longDescription: `ThemisFin AI is a compliance automation platform designed for financial institutions. It combines large language models with deterministic rule engines to audit transaction records, flag anomalies, and generate structured compliance reports.

The backend is built on Spring Boot, exposing REST APIs secured with JWT. The audit pipeline processes records in parallel using virtual threads (Java 21), runs them through configurable rule sets, and exports findings to PDF/Excel formats. The LLM integration uses prompt chaining to explain anomaly rationale in plain English.`,
    language: 'Java',
    languageColor: '#b07219',
    technologies: ['Java 21', 'Spring Boot', 'PostgreSQL', 'OpenAI API', 'JWT', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/Reranko05/themis-fin-ai',
    demoUrl: 'https://themisfin.example.com',
    lastUpdated: '2025-04-15',
    featured: true,
    topics: ['fintech', 'compliance', 'ai', 'spring-boot', 'java'],
  },
  {
    slug: 'mini-drive',
    name: 'Mini Drive',
    description: 'Lightweight cloud-backed file storage prototype with a minimal UI.',
    longDescription: `Mini Drive is a compact file storage prototype designed to explore storage abstractions, resumable uploads, and small-scale metadata indexing. It is intended as a learning project demonstrating file streaming, client-side chunked uploads, and a tiny UI for browsing and sharing files.`,
    language: 'TypeScript',
    languageColor: '#2b7489',
    technologies: ['TypeScript', 'Node.js', 'Express', 'SQLite', 'React'],
    githubUrl: 'https://github.com/Reranko05/mini-drive',
    lastUpdated: '2025-03-10',
    featured: true,
    topics: ['storage', 'uploads', 'node', 'typescript'],
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjects(): Project[] {
  return projects
}
