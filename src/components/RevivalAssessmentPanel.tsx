import { getRevivalAssessment } from '../data/revivalAssessments'

const readinessCopy = {
  HIGH: 'HIGH / 值得重做', MIXED: 'MIXED / 有条件成立', LOW: 'LOW / 当前不优先', BLOCKED: 'BLOCKED / 结构性受阻', UNRATED: 'UNRATED / 待评估',
} as const
const confidenceCopy = { HIGH:'HIGH', MEDIUM:'MEDIUM', LOW:'LOW' } as const

export function RevivalAssessmentPanel({ artifactId, compact = false }: { artifactId: string; compact?: boolean }) {
  const assessment = getRevivalAssessment(artifactId)
  const dimensions = Object.values(assessment.dimensions)
  return <section className={`readiness-panel readiness-${assessment.readiness.toLowerCase()} ${compact ? 'is-compact' : ''}`}>
    <div className="readiness-head">
      <div><span>REVIVAL READINESS</span><strong>{readinessCopy[assessment.readiness]}</strong></div>
      <div><span>CONFIDENCE</span><b>{confidenceCopy[assessment.confidence]}</b></div>
    </div>
    <p className="readiness-thesis">{assessment.thesis}</p>
    {assessment.blocker && <p className="readiness-blocker"><span>KEY CONSTRAINT</span>{assessment.blocker}</p>}
    {!compact && <div className="readiness-dimensions">{dimensions.map(dimension => <article key={dimension.label} className={`dimension dimension-${dimension.level.toLowerCase()}`}>
      <div><span>{dimension.label}</span><b>{dimension.level}</b></div><p>{dimension.note}</p>
    </article>)}</div>}
  </section>
}
