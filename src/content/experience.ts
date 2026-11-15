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
    role: 'Software Engineer',
    org: 'Hosté',
    points: [
      'Lead the engineering infrastructure, overseeing system architecture, backend development, database design, integrations, and deployment operations.',
      'Build and maintain the platform with a focus on sound architecture, reliability, maintainability, and scalability.',
    ],
  },
  {
    period: '2024/2025',
    role: 'Software Director II',
    org: 'NACOS TPi Chapter — Nigerian Association of Computing Students',
    points: [
      'Held a technical leadership position within the student chapter.',
      'Contributed to software-focused initiatives and community programmes.',
      'Awarded Certificate of Office upon completion.',
    ],
  },
  {
    period: '2024',
    role: 'Software Development Intern (SIWES)',
    org: 'SoftcodTechNG, Ibadan',
    points: [
      'Completed industrial training focused on C#, web development, and software engineering fundamentals.',
      'Developed a foundation in C# and object-oriented programming that supported my progression into backend development with ASP.NET Core.',
      'Awarded SIWES Industrial Training Certificate upon completion.',
    ],
  },
]

export const education: TimelineItem[] = [
  {
    period: 'Completed',
    role: 'National Diploma (ND) — Computer Science',
    org: 'The Polytechnic Ibadan',
    points: [],
  },
  {
    period: 'Present',
    role: 'Higher National Diploma (HND) — Computer Science',
    org: 'The Polytechnic Ibadan',
    points: [],
    muted: true,
  },
]