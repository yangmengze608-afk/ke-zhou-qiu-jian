import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Artifact } from '../types'

const fallbackGroups = [
  ['Keep', '最值得保留的 Product DNA · 待研究'],
  ['Kill', '移除当年不再成立的摩擦 · 待研究'],
  ['AI Mutation', '把人工稀缺转化为智能协作 · 概念 Demo'],
  ['MVP Features', '档案漫游 / DNA 提取 / Revival 假设'],
  ['UX Principle', '让发现先于解释，让证据约束想象'],
  ['Suggested Stack', 'React / TypeScript / 可审计的数据层'],
]

type Props = {
  open: boolean
  artifact: Artifact | null
  onClose: () => void
}

export function BlueprintModal({ open, artifact, onClose }: Props) {
  const blueprint = artifact?.revival.blueprint
  const groups = artifact ? [
    ['Keep', blueprint?.keep.join(' · ') || '待研究'],
    ['Kill', blueprint?.kill.join(' · ') || '待研究'],
    ['AI Mutation', blueprint?.ai_mutation.join(' · ') || '待研究'],
    ['MVP Features', blueprint?.mvp_features.join(' · ') || '待研究'],
    ['UX Principle', '让发现先于解释，让证据约束想象'],
    ['Suggested Stack', 'React / TypeScript / 可审计的数据层'],
  ] : fallbackGroups

  return <AnimatePresence>{open && <motion.div className="modal-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="Revival Blueprint">
    <button className="modal-backdrop" onClick={onClose} aria-label="关闭 Blueprint" />
    <motion.div className="blueprint" initial={{y:70, scale:.97}} animate={{y:0, scale:1}} exit={{y:40, opacity:0}} transition={{duration:.6, ease:[.22,1,.36,1]}}>
      <button className="icon-button" onClick={onClose} aria-label="关闭"><X /></button>
      <p className="eyebrow gold">REVIVAL BLUEPRINT / FRONT-END MOCK</p>
      <h2>{artifact ? <>重新计算「{artifact.name}」</> : '重新计算一件遗物'}</h2>
      <p className="blueprint-note">这是一份体验原型，不是 AI 生成结果，也不是经验证的产品判断。正式版本必须由来源证据约束 Product DNA 与 Revival 假设。</p>
      <div className="blueprint-grid">{groups.map(([title,body],i)=><section key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></section>)}</div>
      <div className="prompt-preview"><p>BUILD PROMPT PREVIEW</p><code>{artifact ? `以「${artifact.name}」经过核验的 Product DNA 为起点，构建 clean-room 2026 MVP；保留可验证价值，删除未经证实的历史假设，并解释 AI 改变了哪些原始约束……` : '以可验证的 Product DNA 为起点，构建 clean-room 2026 MVP；保留社区记忆，删除未经证实的历史假设……'}</code></div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
