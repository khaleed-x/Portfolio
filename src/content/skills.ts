export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['C# (Primary)', 'TypeScript', 'JavaScript', 'Python', 'PHP', 'Java'] },
  { label: 'Backend Engineering', items: ['ASP.NET Core', 'Node.js', 'Express', 'REST API Development', 'Background Services', 'Docker'] },
  { label: 'Architecture & Design', items: ['Modular Monolith', 'Layered Architecture', 'Dependency Injection', 'Repository / Service Pattern'] },
  { label: 'Databases & Data Access', items: ['PostgreSQL', 'SQL Server', 'MySQL', 'Entity Framework Core', 'Prisma'] },
  { label: 'Frontend', items: ['React', 'HTML / CSS'] },
  { label: 'Currently Exploring', items: ['Native AOT (.NET)', 'Distributed Systems', 'Queue-Based Architecture', 'System Design'] },
]
