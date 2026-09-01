import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, GitBranch } from 'lucide-react'
import { artifacts } from './data/artifacts'
import type { Artifact } from './types'
import { FluidCanvas } from './components/FluidCanvas'
import { LivingRiver } from './components/LivingRiver'
import { ArtifactDetail } from './components/ArtifactDetail'
import { BlueprintModal } from './components/BlueprintModal'

const repoUrl = 'https://github.com/yangmengze608-afk/ke-zhou-qiu-jian'

function App() {
  const [selected, setSelected] = useState<Artifact | null>(null)
  const [revivalTarget, setRevivalTarget] = useState<Artifact | null>(null)
  const [blueprint, setBlueprint] = useState(false)
  const [notice, setNotice] = useState('')
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, .13], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, .13], [1, .92])

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null)
        setBlueprint(false)
      }
    }
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [])

  const nudge = (text: string) => {
    setNotice(text)
    setTimeout(() => setNotice(''), 2400)
  }

  const sendToRevival = (artifact: Artifact) => {
    setRevivalTarget(artifact)
    setSelected(null)
    requestAnimationFrame(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('revival')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    })
  }

  return <main>
    <FluidCanvas />
    <nav className="nav"><a href="#top" className="mark">刻舟求剑</a><span>样例档案 · 数据待最终核验</span><a href="#archive">ARCHIVE 006</a></nav>

    <section className="hero" id="top">
      <motion.div className="hero-copy" style={{opacity:heroOpacity, scale:heroScale}}>
        <p className="eyebrow">PRODUCT ARCHAEOLOGY FOR THE CHINESE INTERNET</p>
        <h1><span>刻舟</span><span>求剑</span></h1>
        <div className="hero-bottom"><p>船已经走了，<br/>剑还在原地吗？</p><p>打捞被时代错杀的产品创意，<br/>并重新计算它们在 AI 时代的位置。</p></div>
        <a className="enter" href="#archive">进入河流 <ArrowDown size={16}/></a>
      </motion.div>
      <div className="depth">水深 / 000</div>
    </section>

    <section className="archive archive-v02" id="archive">
      <header className="section-head"><div><p className="eyebrow">01 / SUBMERGED ARCHIVE</p><h2>历史不是直线。<br/>它是一条改道的河。</h2></div><p>滚动不是翻页，而是时间本身。河道会收束、改道，再在 Revival 前重新展开。</p></header>
      <LivingRiver artifacts={artifacts} onSelect={setSelected} />
    </section>

    <section className="revival" id="revival">
      <div className="opening" aria-hidden="true"><span/><span/><span/></div>
      <p className="eyebrow gold">02 / REVIVAL LAB</p>
      <motion.h2 initial={{opacity:.15}} whileInView={{opacity:1}} viewport={{amount:.65}} transition={{duration:1.2}}>如果今天重新做，<br/><em>它还会死吗？</em></motion.h2>
      <p className="revival-lead">死亡档案不是终点。我们把怀旧拆开，只留下能够穿越周期的产品思想。</p>
      {revivalTarget ? <div className="revival-target" aria-live="polite"><span>当前打捞 / CURRENT ARTIFACT</span><strong>{revivalTarget.name}</strong><button onClick={() => setRevivalTarget(null)}>移出实验台</button></div> : <p className="revival-empty">你也可以先浏览实验室；从河流中选择一件遗物后，这里会接住它。</p>}
      <div className="transmutation">{['遗物','Product DNA','AI Opportunity','2026 MVP'].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong>{i<3&&<b>→</b>}</div>)}</div>
      <button className="primary" onClick={()=>setBlueprint(true)}>{revivalTarget ? `生成「${revivalTarget.name}」Revival Blueprint` : '生成 Revival Blueprint'} <ArrowUpRight size={18}/></button>
      <small className="mock-label">前端交互 Mock · 不调用真实 AI</small>
    </section>

    <section className="manifesto" id="methodology"><p className="eyebrow">03 / CLEAN ROOM MANIFESTO</p><div><h2>记住消失，<br/>不等于占有遗物。</h2><div className="manifesto-copy"><p>“刻舟求剑”不是盗版资源仓库。</p><p>不托管 ROM、破解资源、泄露源码，不复制整站内容；不把“停止维护”理解为版权消失。我们以 metadata、来源索引、历史研究和产品思想分析为主，Revival 偏向 clean-room reimplementation。</p><p className="rights">每条正式记录都应拥有可审计来源与 rights_status。</p></div></div></section>

    <footer id="about"><div><strong>刻舟求剑</strong><span>KE ZHOU QIU JIAN</span></div><div className="footer-links"><a href={repoUrl} target="_blank" rel="noreferrer"><GitBranch size={15}/> GitHub</a><a href={`${repoUrl}/issues/new?title=${encodeURIComponent('提交一个被遗忘的中文互联网产品 / Forgotten product')}`} target="_blank" rel="noreferrer">Submit a forgotten product</a><a href="#methodology">Methodology</a><button onClick={()=>nudge('MVP 0.2 · Living River interaction')}>About</button></div><small>Product Archaeology for the Chinese Internet · MVP 0.2</small></footer>

    <ArtifactDetail artifact={selected} onClose={()=>setSelected(null)} onRevive={sendToRevival} />
    <BlueprintModal open={blueprint} artifact={revivalTarget} onClose={()=>setBlueprint(false)} />
    <div className={`toast ${notice?'show':''}`} role="status">{notice}</div>
  </main>
}

export default App
