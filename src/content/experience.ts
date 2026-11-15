export interface TimelineItem {
  period: string
  role: string
  org: string
  points: string[]
  muted?: boolean
}

export const experience: TimelineItem[] = [
  {
    period: 'Present',
    role: 'Lead Backend Engineer',
    org: 'Hosté',
    points: [
      'Lead the backend engineering effort, directing architecture and overall implementation',
      'Build the platform as a modular monolith, with clear module boundaries designed to evolve',
    ],
  },
  {
    period: '2024/2025',
    role: 'Software Director II',
    org: 'NACOS TPi Chapter — Nigerian Association of Computing Students',
    points: [
      'Held a technical leadership position within the student chapter',
      'Contributed to software-focused initiatives and community programmes',
      'Awarded Certificate of Office upon completion',
    ],
  },
  {
    period: '2024',
    role: 'Software Development Intern (SIWES)',
    org: 'SoftcodTechNG, Ibadan',
    points: [
      'Completed industrial training focused on C#, web development, and software engineering fundamentals. This built my foundation in C# and object-oriented programming, which led to my move into backend development with ASP.NET Core.',
      'Awarded SIWES Industrial Training Certificate upon completion',
    ],
  },
  {
    period: 'In Progress',
    role: 'Higher National Diploma — Computer Science',
    org: 'The Polytechnic Ibadan',
    points: [],
    muted: true,
  },
]
