export interface Service {
  number: string
  title: string
  desc: string
  tags: string[]
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Web Platforms',
    desc: 'I design and build production-ready web platforms that solve real-world problems, across e-commerce, financial systems, administrative systems, and internal business tools, with an emphasis on maintainable architecture, secure APIs, and long-term scalability.',
    tags: ['ASP.NET Core', 'Web API', 'Entity Framework', 'PostgreSQL', 'SQL Server', 'React'],
  },
  {
    number: '02',
    title: 'Backend Systems',
    desc: 'I build the backend infrastructure that powers modern applications: reliable APIs, asynchronous workloads, and modular architectures that support growth without sacrificing maintainability.',
    tags: ['Modular Monolith', 'Distributed Systems', 'Background Services', 'Queue Architecture'],
  },
  {
    number: '03',
    title: 'Beyond Engineering',
    desc: "Software isn't my only craft. I also design bespoke menswear, where the same principles of precision, structure, and thoughtful design guide every piece.",
    tags: ['Bespoke Tailoring', 'Garment Construction', 'khaleed.x Apparel'],
  },
]
