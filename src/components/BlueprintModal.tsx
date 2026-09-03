import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { CatalogArtifact } from '../data/catalog'
import { getRevivalAssessment } from '../data/revivalAssessments'
import { RevivalAssessmentPanel } from './RevivalAssessmentPanel'

const fallbackGroups = [
  ['Keep', '最值得保留的 Product DNA · 待研究'], ['Kill', '移除当年不再成立的摩擦 · 待研究'], ['AI Mutation', '把人工稀缺转化为智能协作 · 概念 Demo'], ['MVP Features', '档案漫游 / DNA 提取 / Revival 假设'], ['UX Principle', '让发现先于解释，让证据约束想象'], ['Suggested Stack', 'React / TypeScript / 可审计的数据层'],
]

type Props = { open: boolean; artifacts: CatalogArtifact[]; onClose: () => void; onOpenConcept?: (artifact: CatalogArtifact) => void }

const meaningful = (items: string[]) => items.filter(item => !item.includes('待研究') && !item.includes('待生成'))

export function BlueprintModal({ open, artifacts, onClose, onOpenConcept }: Props) {
  const single = artifacts.length === 1 ? artifacts[0] : null
  const combinedKeep = meaningful(artifacts.flatMap(a => a.product_dna)).slice(0, 4)
  const combinedMutation = meaningful(artifacts.flatMap(a => a.ai_changes)).slice(0, 4)
  const groups = single ? [
    ['Keep', single.revival.blueprint.keep.join(' · ') || '待研究'], ['Kill', single.revival.blueprint.kill.join(' · ') || '待研究'], ['AI Mutation', single.revival.blueprint.ai_mutation.join(' · ') || '待研究'], ['MVP Features', single.revival.blueprint.mvp_features.join(' · ') || '待研究'], ['UX Principle', '让发现先于解释，让证据约束想象'], ['Suggested Stack', 'React / TypeScript / 可审计的数据层'],
  ] : artifacts.length > 1 ? [
    ['Keep', combinedKeep.join(' · ') || '比较多件遗物的 Product DNA，先找共同价值，再决定是否组合。'],
    ['Kill', '不要把旧产品直接拼接；删除只由当年渠道、终端或平台红利支撑的机制。'],
    ['AI Mutation', combinedMutation.join(' · ') || '用 AI 对照多件遗物的共同约束与互补能力，而不是默认 AI 能解决所有旧问题。'],
    ['MVP Features', '组合研究台 · Product DNA 对照 · 共同需求提取 · 最小可验证 Revival 原型'],
    ['UX Principle', '先证明共同需求仍存在，再决定哪些遗物值得融合。'],
    ['Suggested Stack', 'React / TypeScript / provenance-aware data layer / evaluation loop'],
  ] : fallbackGroups
  const title = single ? `重新计算「${single.name}」` : artifacts.length > 1 ? `组合打捞 · ${artifacts.length} 件遗物` : '重新计算一件遗物'

  return <AnimatePresence>{open && <motion.div className="modal-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="Revival Blueprint">
    <button className="modal-backdrop" onClick={onClose} aria-label="关闭 Blueprint" />
    <motion.div className="blueprint" initial={{y:70, scale:.97}} animate={{y:0, scale:1}} exit={{y:40, opacity:0}} transition={{duration:.6, ease:[.22,1,.36,1]}}>
      <button className="icon-button" onClick={onClose} aria-label="关闭"><X /></button>
      <p className="eyebrow gold">REVIVAL BLUEPRINT / FRONT-END MOCK</p><h2>{title}</h2>
      <p className="blueprint-note">这是一份体验原型，不是 AI 生成结果。Revival Readiness 是结构化研究判断，不是精确概率；证据变化时应允许结论变化。</p>
      {single && <RevivalAssessmentPanel artifactId={single.id} compact />}
      {artifacts.length > 1 && <><div className="blueprint-specimens">{artifacts.map(a => { const assessment = getRevivalAssessment(a.id); return <span key={a.id}><i style={{background:a.exhibit.accent}}/>{a.name}<small>READINESS {assessment.readiness} · CONF {assessment.confidence}</small></span> })}</div><p className="group-readiness-note">组合打捞不计算机械平均分：产品之间可能互补，也可能把彼此的约束叠加。组合 Blueprint 只把单件 Readiness 作为输入证据。</p></>}
      <div className="blueprint-grid">{groups.map(([heading,body],i)=><section key={heading}><span>0{i+1}</span><h3>{heading}</h3><p>{body}</p></section>)}</div>
      {single?.id === 'artifact-09' && onOpenConcept && <button className="concept-launch" onClick={()=>onOpenConcept(single)}><span><small>REVIVAL CONCEPT 01 / INTERACTIVE MOCK</small>打开「千千静听 → 2026」概念原型</span><ArrowUpRight size={18}/></button>}
      <div className="prompt-preview"><p>BUILD PROMPT PREVIEW</p><code>{single ? `以「${single.name}」经过核验的 Product DNA 与 Revival Readiness 为约束，构建 clean-room 2026 MVP；优先验证弱维度和关键约束，而不是把 HIGH/MIXED 当成确定结论……` : artifacts.length > 1 ? `对照 ${artifacts.map(a=>a.name).join('、')} 的 Product DNA、Readiness 与结构性约束，找出共同需求与互补能力；不要平均评分，只生成能够最先证伪组合假设的最小 2026 MVP……` : '以可验证的 Product DNA 为起点，构建 clean-room 2026 MVP……'}</code></div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
