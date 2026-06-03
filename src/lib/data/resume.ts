export const resumeData = {
  name: 'Aaditya Srinivasan',
  title: 'Backend Engineer',
  location: 'India',
  email: 'aaditya@example.com',
  github: 'github.com/Reranko05',
  linkedin: 'linkedin.com/in/aaditya-srinivasan',

  experience: [
    {
      company: 'TechCorp Systems',
      role: 'Backend Engineering Intern',
      period: 'May 2025 – Jul 2025',
      location: 'Bengaluru, India (Remote)',
      bullets: [
        'Designed and implemented a JWT-based authentication microservice in Spring Boot, reducing login latency by 34ms p99.',
        'Migrated a legacy batch job to a Kafka-backed event streaming pipeline, improving throughput from 8K to 120K records/min.',
        'Optimized 12 slow PostgreSQL queries using EXPLAIN ANALYZE; reduced dashboard load time by 1.8s.',
        'Wrote integration tests covering 94% of the API surface using JUnit 5 and Testcontainers.',
      ],
    },
    {
      company: 'OpenLab Research',
      role: 'Systems Research Intern',
      period: 'Dec 2024 – Feb 2025',
      location: 'Remote',
      bullets: [
        'Contributed to a research prototype columnar store in C++; implemented a block-level LZ4 compression layer.',
        'Benchmarked ingestion throughput against DuckDB and ClickHouse across 5 dataset profiles.',
        'Wrote technical notes summarizing findings; shared as internal engineering memos.',
      ],
    },
  ],

  education: [
    {
      institution: 'Vellore Institute of Technology',
      degree: 'B.Tech Computer Science & Engineering',
      period: '2022 – 2026',
      gpa: '8.9 / 10',
      relevantCourses: ['Operating Systems', 'Database Systems', 'Computer Networks', 'Algorithms', 'Distributed Systems'],
    },
  ],

  skills: {
    languages: ['C++17', 'Java 21', 'Python 3', 'Go', 'SQL', 'TypeScript'],
    backend: ['Spring Boot', 'REST APIs', 'JWT', 'gRPC', 'Kafka', 'Redis'],
    databases: ['PostgreSQL', 'MySQL', 'ClickHouse', 'MongoDB'],
    infrastructure: ['Docker', 'Kubernetes', 'AWS (EC2/S3/RDS)', 'GitHub Actions', 'Linux'],
    tools: ['Git', 'CMake', 'Gradle', 'Postman', 'DataGrip'],
  },

  ossHighlights: [
    { project: 'Apache Arrow', pr: '#38497', description: 'Fixed off-by-one in BitmapReader — merged to main.' },
    { project: 'Apache Arrow', pr: '#36812', description: 'CSV reader performance — 18% memory reduction.' },
    { project: 'Apache Arrow', pr: '#37890', description: 'ChunkedArray API docs with doctests — merged.' },
  ],
}
