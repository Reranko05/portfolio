export const profile = {
  name: 'Aaditya Srinivasan',
  username: 'Reranko05',
  title: 'Backend Engineer',
  tagline: 'Backend Engineer • Systems Builder',
  bio: 'Computer Science student focused on backend engineering, systems programming, databases, networking, and distributed systems.',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: '',
  avatar: '/avatar.png',
  socials: {
    github: 'https://github.com/Reranko05',
    linkedin: 'https://www.linkedin.com/in/aaditya-srinivasan/',
    resume: '/resume.pdf',
  },
  currentFocus: [
    {
      label: 'Zoqik Database Server',
      description:
        'Building a Redis-inspired, in-memory data engine in C++ with a resilient RESP parser and high-throughput networking.',
    },
    {
      label: 'Systems & Performance',
      description:
        'Backend systems, low-latency networking, and database internals — focusing on correctness and measurable performance.',
    },
  ],
  about: `I am a Computer Science undergraduate at SRM Institute of Science and Technology with interests in backend engineering, systems programming, networking, databases, and distributed systems.

My current focus areas include database internals, high-performance backend systems, networking protocols, and infrastructure engineering.

I build systems projects from scratch to deepen my understanding of distributed systems and backend architecture.`,
} as const
