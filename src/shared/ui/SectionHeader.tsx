import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  title: ReactNode
  emphasis: ReactNode
}

export function SectionHeader({ eyebrow, title, emphasis }: Props) {
  return (
    <>
      <div className="section-pre">{eyebrow}</div>
      <h2 className="section-title">
        {title} <em>{emphasis}</em>
      </h2>
      <div className="section-rule" />
    </>
  )
}
