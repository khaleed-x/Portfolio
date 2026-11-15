export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['C# (Primary)', 'TypeScript', 'PHP', 'Python', 'JavaScript'] },
  { label: 'Backend Engineering', items: ['ASP.NET Core', 'Entity Framework Core', 'REST APIs', 'Background Services'] },
  { label: 'Architecture & Design', items: ['Modular Monolith', 'Layered Architecture', 'Repository / Service Pattern', 'Dependency Injection'] },
  { label: 'Database', items: ['PostgreSQL', 'SQL Server'] },
  { label: 'Frontend', items: ['React', 'TypeScript', 'HTML / CSS'] },
  { label: 'Authentication', items: ['JWT', 'Cookie Authentication', 'Session Management'] },
  { label: 'Integrations', items: ['Paystack API', 'MailKit', 'Termii SMS'] },
  { label: 'Developer Tools', items: ['VS Code', '.NET SDK', 'Git', 'GitHub'] },
  { label: 'Currently Exploring', items: ['Native AOT (.NET)', 'Distributed Systems', 'Queue-Based Architecture', 'System Design'] },
]
