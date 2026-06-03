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
    stars: 47,
    forks: 9,
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
    stars: 23,
    forks: 4,
    lastUpdated: '2025-04-15',
    featured: true,
    topics: ['fintech', 'compliance', 'ai', 'spring-boot', 'java'],
  },
  {
    slug: 'apache-arrow-contributions',
    name: 'Apache Arrow — OSS',
    description: 'Ongoing investigations and fixes in the Apache Arrow C++ library — memory, IPC, and compute modules.',
    longDescription: `My ongoing open source work on the Apache Arrow project. Apache Arrow is a columnar in-memory format used by Pandas, Spark, DuckDB, and many other systems.

I've investigated memory layout issues in the IPC flatbuffer serialization layer, contributed a fix for an off-by-one error in the BitmapReader used in the compute kernel, and opened issues with reproduction cases for several edge-case crashes in the C++ ADBC driver.`,
    language: 'C++',
    languageColor: '#f34b7d',
    technologies: ['C++', 'Apache Arrow', 'CMake', 'Google Benchmark', 'GitHub Actions'],
    githubUrl: 'https://github.com/apache/arrow',
    stars: 14200,
    forks: 3490,
    lastUpdated: '2025-06-01',
    featured: true,
    topics: ['open-source', 'data', 'columnar', 'c++', 'apache'],
  },
  {
    slug: 'jwt-auth-service',
    name: 'JWT Auth Service',
    description: 'Stateless authentication microservice with refresh token rotation and Redis session store.',
    longDescription: `A production-ready authentication microservice implementing JWT-based stateless auth with refresh token rotation. Built with Spring Boot and secured against common attack vectors including token replay, brute force, and CSRF.`,
    language: 'Java',
    languageColor: '#b07219',
    technologies: ['Spring Boot', 'JWT', 'Redis', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Reranko05/jwt-auth-service',
    stars: 31,
    forks: 7,
    lastUpdated: '2025-03-10',
    featured: false,
    topics: ['auth', 'security', 'microservice', 'spring-boot'],
  },
  {
    slug: 'log-ingestion-pipeline',
    name: 'Log Ingestion Pipeline',
    description: 'High-throughput log ingestion pipeline using Kafka, Go, and ClickHouse for analytics.',
    longDescription: `A scalable log ingestion system capable of handling millions of log events per second. Producers write structured JSON logs to Kafka topics; a Go consumer deserializes, validates, and batches inserts into ClickHouse for real-time analytics queries.`,
    language: 'Go',
    languageColor: '#00add8',
    technologies: ['Go', 'Apache Kafka', 'ClickHouse', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/Reranko05/log-pipeline',
    stars: 18,
    forks: 3,
    lastUpdated: '2025-01-22',
    featured: false,
    topics: ['observability', 'kafka', 'clickhouse', 'go', 'pipeline'],
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
