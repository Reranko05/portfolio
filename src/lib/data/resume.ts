export const resumeData = {
  name: 'Aaditya Srinivasan',
  title: 'Backend Engineer',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: '',
  github: 'github.com/Reranko05',
  linkedin: 'linkedin.com/in/aaditya-srinivasan',

  experience: [
    {
      company: 'Infosys Springboard',
      role: 'Software Development Intern',
      period: '2024',
      location: 'Remote',
      bullets: [
        'Worked on backend services and integrations using Java and Spring Boot.',
        'Implemented API endpoints, added unit and integration tests, and collaborated with cross-functional teams.',
        'Focused on correctness, observability, and maintainability of production code.',
      ],
    },
    {
      company: 'Apache Arrow (Open Source)',
      role: 'Contributor',
      period: '2024 – Present',
      location: 'Remote',
      bullets: [
        'Fixed an off-by-one bug in BitmapReader (PR #38497) which was merged to main.',
        'Investigated IPC serialization edge cases and authored a fix currently under review (PR #39180).',
        'Authored documentation improvements for ChunkedArray and added doctest-compatible examples (PR #37890).',
      ],
    },
    {
      company: 'Grafana k6 (Open Source)',
      role: 'Contributor',
      period: '2024',
      location: 'Remote',
      bullets: [
        'Contributed fixes and tests to k6 for improved reliability in CI environments.',
        'Collaborated with maintainers to triage issues and improve observability for test runs.',
      ],
    },
  ],

  education: [
    {
      institution: 'SRM Institute of Science and Technology',
      degree: 'B.Tech, Computer Science and Engineering',
      period: '2023 – 2027',
      gpa: '9.41 / 10',
      relevantCourses: ['Operating Systems', 'Database Systems', 'Computer Networks', 'Algorithms', 'Distributed Systems'],
    },
  ],

  skills: {
    languages: ['C++17', 'Java 21', 'Python 3', 'Go', 'SQL', 'TypeScript'],
    backend: ['Spring Boot', 'REST APIs', 'gRPC', 'Kafka', 'Redis'],
    databases: ['PostgreSQL', 'ClickHouse', 'MySQL'],
    infrastructure: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux'],
    tools: ['Git', 'CMake', 'Gradle', 'DataGrip'],
  },

  ossHighlights: [
    { project: 'Apache Arrow', pr: '#38497', description: 'Fixed off-by-one in BitmapReader — merged to main.' },
    { project: 'Apache Arrow', pr: '#36812', description: 'CSV reader performance — memory reduction and throughput improvements.' },
    { project: 'Apache Arrow', pr: '#37890', description: 'ChunkedArray API docs with doctests — merged.' },
  ],
}
