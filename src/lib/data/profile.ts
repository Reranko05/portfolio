export const profile = {
  name: 'Aaditya Srinivasan',
  username: 'Reranko05',
  title: 'Backend Engineer',
  tagline: 'Backend Engineer • Systems Builder • Open Source Contributor',
  bio: 'Building scalable systems, low-latency backends, and real-world infrastructure. Passionate about performance, correctness, and open source.',
  location: 'India',
  email: 'aaditya@example.com',
  avatar: '/avatar.png',
  socials: {
    github: 'https://github.com/Reranko05',
    linkedin: 'https://linkedin.com/in/aaditya-srinivasan',
    resume: '/resume.pdf',
  },
  currentFocus: [
    { label: 'Apache Arrow Contributions', description: 'Investigating memory layout issues and contributing fixes to the Apache Arrow C++ library.' },
    { label: 'Zoqik Database Server', description: 'Building a Redis-inspired, in-memory key-value store in C++ with RESP protocol support.' },
    { label: 'Placement Preparation', description: 'Solving DSA problems, studying system design, and preparing for SWE interviews.' },
  ],
  about: `I'm a backend engineer who enjoys working at the intersection of systems programming and distributed infrastructure. I write C++ for performance-critical components, Java/Spring Boot for service APIs, and Python for tooling and automation.

I believe great software is built through deep understanding — of the hardware, the protocol, and the problem domain. I contribute to open source as a way to learn from production-grade codebases and give back to the community.

When I'm not coding, I write technical blog posts about things I've figured out the hard way.`,
} as const
