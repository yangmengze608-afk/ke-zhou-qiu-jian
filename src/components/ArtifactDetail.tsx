import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Artifact } from '../types'

const rows: [string, keyof Pick<Artifact, 'product_dna'|'why_it_mattered'|'why_it_disappeared'|'what_survived'|'ai_changes'>][] = [
  ['Product DNA', 'product_dna'], ['它为何重要', 'why_it_mattered'], ['为何消失', 'why_it_disappeared'], ['留下了什么', 'what_survived'], ['AI 改变了什么', 'ai_changes'],
]

export function ArtifactDetail({ artifact, onClose }: { artifact: Artifact | null; onClose: () => void }) {
  return <AnimatePresence>{artifact && <>
    <motion.button className="veil" aria-label="关闭详情" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
    <motion.aside className="detail" role="dialog" aria-modal="true" aria-label={`${artifact.name} 产品考古`} initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.65, ease:[.22,1,.36,1]}}>
      <button className="icon-button" onClick={onClose} aria-label="关闭"><X /></button>
      <p className="eyebrow">ARCHIVE / {artifact.id}</p>
      <h2>{artifact.name}</h2>
      <div className="status-line"><span>{artifact.category}</span><span>{artifact.lifecycle.status}</span></div>
      <div className="unverified">UI DEMO · 历史资料待核验</div>
      <p className="detail-intro">该记录目前仅用于验证产品体验。生命周期、影响与消失原因尚未研究，不构成历史结论。</p>
      {rows.map(([label,key]) => <section className="detail-row" key={key}><h3>{label}</h3><p>{artifact[key].join(' · ')}</p></section>)}
      <section className="score"><span>Revival Score</span><strong>—</strong><small>{artifact.revival.score_status}</small></section>
      <p className="sources">Sources status · 0 条来源 / 待核验</p>
    </motion.aside>
  </>}</AnimatePresence>
}
