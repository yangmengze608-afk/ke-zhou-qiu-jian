import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ExternalLink, X } from 'lucide-react'
import type { Artifact } from '../types'

const rows: [string, keyof Pick<Artifact, 'product_dna'|'why_it_mattered'|'why_it_disappeared'|'what_survived'|'ai_changes'>][] = [
  ['Product DNA', 'product_dna'], ['它为何重要', 'why_it_mattered'], ['为何消失', 'why_it_disappeared'], ['留下了什么', 'what_survived'], ['AI 改变了什么', 'ai_changes'],
]

const verificationCopy: Record<Artifact['verification_status'], string> = {
  'demo-unverified': 'UI DEMO · 历史资料待核验',
  'partially-verified': 'PARTIALLY VERIFIED · 事实有来源 / 分析为项目判断',
  'verified': 'VERIFIED · 核心历史事实已核验',
}

const sourceStatus: Record<Artifact['verification_status'], string> = {
  'demo-unverified': '待核验',
  'partially-verified': '部分核验',
  'verified': '已核验',
}

type Props = {
  artifact: Artifact | null
  onClose: () => void
  onRevive: (artifact: Artifact) => void
}

export function ArtifactDetail({ artifact, onClose, onRevive }: Props) {
  return <AnimatePresence>{artifact && <>
    <motion.button className="veil" aria-label="关闭详情" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
    <motion.aside className="detail" role="dialog" aria-modal="true" aria-label={`${artifact.name} 产品考古`} initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.65, ease:[.22,1,.36,1]}}>
      <button className="icon-button" onClick={onClose} aria-label="关闭"><X /></button>
      <p className="eyebrow">ARCHIVE / {artifact.id}</p>
      <h2>{artifact.name}</h2>
      <div className="status-line"><span>{artifact.category}</span><span>{artifact.lifecycle.status}</span></div>
      <div className={`verification verification-${artifact.verification_status}`}>{verificationCopy[artifact.verification_status]}</div>
      <p className="detail-intro">{artifact.summary}</p>

      {rows.map(([label,key]) => <section className="detail-row" key={key}>
        <h3>{label}</h3>
        <ul>{artifact[key].map(item => <li key={item}>{item}</li>)}</ul>
      </section>)}

      <section className="score"><span>Revival Score</span><strong>{artifact.revival.score ?? '—'}</strong><small>{artifact.revival.score_status}</small></section>
      <button className="revive-link" onClick={() => onRevive(artifact)}><span><small>NEXT / REVIVAL LAB</small>把「{artifact.name}」带去重新计算</span><ArrowDownRight size={20}/></button>

      <section className="evidence-block">
        <div className="evidence-head"><span>EVIDENCE / SOURCES</span><strong>{artifact.sources.length} 条 · {sourceStatus[artifact.verification_status]}</strong></div>
        {artifact.sources.length > 0 ? <ol>
          {artifact.sources.map(source => <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer"><span>{source.publisher}</span>{source.title}<ExternalLink size={12}/></a>
          </li>)}
        </ol> : <p>该档案尚未进入正式考据流程。</p>}
        <p className="rights-note"><span>RIGHTS</span>{artifact.rights_status}</p>
      </section>
    </motion.aside>
  </>}</AnimatePresence>
}
