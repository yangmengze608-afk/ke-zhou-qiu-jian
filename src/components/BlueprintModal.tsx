import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const groups = [
  ['Keep', '最值得保留的 Product DNA · 待研究'],
  ['Kill', '移除当年不再成立的摩擦 · 待研究'],
  ['AI Mutation', '把人工稀缺转化为智能协作 · 概念 Demo'],
  ['MVP Features', '档案漫游 / DNA 提取 / Revival 假设'],
  ['UX Principle', '让发现先于解释，让证据约束想象'],
  ['Suggested Stack', 'React / TypeScript / 可审计的数据层'],
]

export function BlueprintModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <motion.div className="modal-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="Revival Blueprint">
    <button className="modal-backdrop" onClick={onClose} aria-label="关闭 Blueprint" />
    <motion.div className="blueprint" initial={{y:70, scale:.97}} animate={{y:0, scale:1}} exit={{y:40, opacity:0}} transition={{duration:.6, ease:[.22,1,.36,1]}}>
      <button className="icon-button" onClick={onClose} aria-label="关闭"><X /></button>
      <p className="eyebrow gold">REVIVAL BLUEPRINT / FRONT-END MOCK</p>
      <h2>重新计算一件遗物</h2>
      <p className="blueprint-note">这是一份体验原型，不是 AI 生成结果，也不是经验证的产品判断。</p>
      <div className="blueprint-grid">{groups.map(([title,body],i)=><section key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></section>)}</div>
      <div className="prompt-preview"><p>BUILD PROMPT PREVIEW</p><code>以可验证的 Product DNA 为起点，构建 clean-room 2026 MVP；保留社区记忆，删除未经证实的历史假设……</code></div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
