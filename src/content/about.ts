export interface StoryChapter {
  period: string
  title: string
  text: string[]
  /** Chapters marked draft are hidden on the site. Fill in the text, then remove `draft: true`. */
  draft?: boolean
}

export const aboutIntro = {
  paragraphs: [
    "I'm a software engineer who designs reliable, maintainable systems with C# and ASP.NET Core. I lead engineering infrastructure at Hosté, across architecture, backend systems, databases, integrations and deployment.",
    'I care about clear module boundaries, practical system design, and software that stays dependable as it grows. Outside software, I design bespoke menswear under khaleed.x, and the same habits of precision and detail carry across both.',
  ],
}

export const story: StoryChapter[] = [
  {
    period: 'Childhood',
    title: 'Where it started',
    draft: true,
    text: ['Write your own words here: where you grew up, what you were curious about, who shaped you.'],
  },
  {
    period: 'Before code',
    title: 'Discovering computers',
    draft: true,
    text: ['Write your own words here: the first time a computer clicked for you.'],
  },
  {
    period: '2024',
    title: 'First lines of C#',
    text: [
      'My industrial training at SoftcodTechNG in Ibadan was where C# became real for me. I worked on object-oriented programming, SQL Server and Windows Forms, and built desktop applications to practise database design.',
    ],
  },
  {
    period: '2024',
    title: 'Moving into the web',
    text: [
      'After training, I taught myself ASP.NET Core through documentation, experiments and real systems. That habit of learning by building is still how I work.',
    ],
  },
  {
    period: '2024–2025',
    title: 'Leading other developers',
    text: [
      'As Software Director II at the NACOS TPi Chapter, I held a technical leadership role, supported student developers and helped encourage practical learning and knowledge sharing.',
    ],
  },
  {
    period: '2025',
    title: 'Studying while building',
    text: [
      'I completed my National Diploma in Computer Science at The Polytechnic Ibadan in 2025, and I am now working towards my HND, building real projects alongside my studies.',
    ],
  },
  {
    period: 'Now',
    title: 'Leading engineering at Hosté',
    text: [
      'Today I lead engineering infrastructure at Hosté, guiding the backend with a modular monolith approach and keeping module boundaries clear as the platform grows.',
    ],
  },
  {
    period: 'Alongside',
    title: 'Bespoke menswear',
    text: ['Away from the keyboard I design bespoke menswear. Garment construction and software architecture feel closer than they sound: both reward careful structure.'],
  },
]
