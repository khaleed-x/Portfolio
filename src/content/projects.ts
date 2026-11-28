export type ProjectStatus = 'live' | 'almost-live' | 'in-development' | 'completed'

export interface ProjectImage {
  /** Path under /public, e.g. "/projects/aurher/home.png" */
  src: string
  alt: string
}

export interface Project {
  slug: string
  name: string
  type: string
  status: ProjectStatus
  summary: string
  /** Paragraphs shown on the detail page */
  details: string[]
  tags: string[]
  highlights?: string[]
  images?: ProjectImage[]
  liveUrl?: string
  /** Add only when the repository is public */
  repoUrl?: string
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'Live',
  'almost-live': 'Almost live',
  'in-development': 'In Development',
  completed: 'Completed',
}


export const projects: Project[] = [
  {
    slug: 'velora',
    name: 'Velora',
    type: 'Collaborative project · Distributed System',
    status: 'in-development',
    summary:
      'An open-source distributed background job processing platform for running asynchronous workloads reliably across services written in different languages.',
    details: [
      'Velora explores how asynchronous workloads can be executed reliably across services written in different programming languages. It focuses on queue-based communication, worker orchestration, and scalable task execution through a shared broker and unified API.',
    ],
    tags: ['Distributed Systems', 'Queue Architecture', 'Worker Orchestration', 'Open Source'],
  },

  {
    slug: 'hoste',
    name: 'Hosté',
    type: 'Professional project · Hospitality Platform',
    status: 'live',
    summary:
      'A hospitality platform built to support its core user, booking, and engagement workflows through a maintainable and scalable software architecture.',
    details: [
      'I lead the engineering infrastructure behind Hosté, overseeing its architecture, backend systems, database design, integrations, and deployment operations.',
    ],
    tags: [
      'Node.js',
      'Express',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Modular Monolith',
      'API Integrations',
    ],
    liveUrl: 'https://www.bookhostes.com/',
  },

  {
    slug: 'vaultng',
    name: 'VaultNG',
    type: 'Full-stack · Financial Platform',
    status: 'almost-live',
    summary:
      'A financial platform that unifies wallets, instant transfers, goal-based savings, fixed-return investments, and business payment collection behind a single backend.',
    details: [
      'VaultNG unifies digital financial services through a single backend. It integrates wallet management, instant transfers, goal-based savings, fixed-return investments, and business payment collection, with an emphasis on modular architecture and secure financial workflows.',
    ],
    tags: ['ASP.NET Core Web API', 'React', 'PostgreSQL', 'Paystack'],
  },
  {
    slug: 'aurher',
    name: 'AurHER',
    type: 'Full-stack · E-commerce Platform',
    status: 'live',
    summary:
      'A production e-commerce platform with secure payments, async email/SMS notifications, optimized media handling, and a full admin system.',
    details: [
      'A production-ready e-commerce platform built with a layered ASP.NET Core architecture. It supports secure payment processing, asynchronous email and SMS notifications, optimized media handling, and a comprehensive administration system for managing products, orders, and business operations.',
    ],
    tags: ['ASP.NET Core MVC', '.NET 10', 'PostgreSQL', 'EF Core', 'Paystack', 'MailKit'],
    liveUrl: 'https://aurher.onrender.com',
  },
  {
    slug: 'synclirix',
    name: 'Synclirix',
    type: 'Collaborative project · Multi-user workspace',
    status: 'live',
    summary:
      'A collaborative workspace for teams to manage projects, tasks, and workflows in real time, with role-based authorization and activity auditing.',
    details: [
      'A collaborative workspace platform for teams to manage projects, tasks, and workflows in real time. The backend emphasizes role-based authorization, activity auditing, and scalable APIs that keep collaboration synchronized across the application.',
    ],
    tags: ['ASP.NET Core Web API', 'React', 'PostgreSQL'],
    liveUrl: 'https://synclirix.vercel.app',
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    type: 'Personal Portfolio',
    status: 'live',
    summary: 'This site: React + TypeScript, with project case studies, a blog, and a pluggable AI assistant.',
    details: [
      'My developer portfolio, structured as a feature-based React + TypeScript app. Projects and blog posts are content-driven, and the AI assistant talks to a backend through a typed client contract.',
    ],
    tags: ['React', 'TypeScript', 'Vite'],
    liveUrl: 'https://khalid-oyekunle.vercel.app',
    repoUrl: 'https://github.com/khaleed-x/portfolio',
  },
  {
    slug: 'desktop-applications',
    name: 'Desktop Applications',
    type: 'Desktop · C# WinForms',
    status: 'completed',
    summary:
      'A set of early C# WinForms apps: grade calculator, car rental, final-year clearance, course management, and barcode attendance.',
    details: [
      'A collection of desktop applications from my early engineering journey: a Student Grade Point Calculator, Car Rental Management, Final Year Clearance Administration, Course Management, and Attendance Tracking with Barcode Verification. They established my foundation in object-oriented programming, database design, and desktop development with C#.',
    ],
    tags: ['C#', 'WinForms', '.NET', 'SQL Server'],
  },
  {
    slug: 'airtel-ussd-simulator',
    name: 'Airtel USSD Simulator',
    type: 'Console Application',
    status: 'completed',
    summary: 'A console simulation of the Airtel USSD flow, built to practice state management in C#.',
    details: [
      'A console-based simulation of the Airtel USSD experience, created to strengthen my understanding of control flow, state management, and interactive command-line design in C#. An early practical C# project.',
    ],
    tags: ['C#', 'Console', 'USSD'],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
