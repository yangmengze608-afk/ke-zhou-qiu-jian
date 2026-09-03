import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, GitBranch } from 'lucide-react'
import { mainArtifacts, siteArtifacts, type CatalogArtifact } from './data/catalog'
import { FluidCanvas } from './components/FluidCanvas'
import { LivingRiver } from './components/LivingRiver'
import { RiverSite } from './components/RiverSite'
import { SalvageBasket } from './components/SalvageBasket'
import { ArtifactDetail } from './components/ArtifactDetail'
import { BlueprintModal } from './components/BlueprintModal'
import { TTPlayerRevivalConcept } from './components/TTPlayerRevivalConcept'

const repoUrl = 'https://github.com/yangmengze608-afk/ke-zhou-qiu-jian'
type Palette = 'celadon' | 'ivory' | 'mist'

function App() {
  const [selected, setSelected] = useState<CatalogArtifact | null>(null)
  const [revivalTargets, setRevivalTargets] = useState<CatalogArtifact[]>([])
  const [salvaged, setSalvaged] = useState<CatalogArtifact[]>([])
  const [basketOpen, setBasketOpen] = useState(false)
  const [blueprint, setBlueprint] = useState(false)
  const [ttConceptOpen, setTtConceptOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [palette, setPalette] = useState<Palette>('celadon')
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, .13], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, .13], [1, .92])
  const salvagedIds = useMemo(() => new Set(salvaged.map(a => a.id)), [salvaged])

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelected(null); setBlueprint(false); setBasketOpen(false); setTtConceptOpen(false) }
    }
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [])

  const nudge = (text: string) => { setNotice(text); setTimeout(() => setNotice(''), 2400) }
  const toggleSalvage = (artifact: CatalogArtifact) => {
    if (salvagedIds.has(artifact.id)) { setSalvaged(items => items.filter(item => item.id !== artifact.id)); return }
    if (salvaged.length >= 5) { nudge('打捞篓最多放 5 件遗物'); return }
    setSalvaged(items => [...items, artifact]); nudge(`已打捞「${artifact.name}」`)
  }
  const scrollToRevival = () => requestAnimationFrame(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('revival')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  })
  const sendToRevival = (artifact: CatalogArtifact) => { setRevivalTargets([artifact]); setSelected(null); scrollToRevival() }
  const sendBasketToRevival = () => { if (!salvaged.length) return; setRevivalTargets(salvaged); setBasketOpen(false); scrollToRevival() }
  const openConcept = (artifact: CatalogArtifact) => {
    if (artifact.id !== 'artifact-09') return
    setBlueprint(false)
    setTtConceptOpen(true)
  }

  return <main className="app-shell" data-palette={palette}>
    <FluidCanvas />
    <nav className="nav"><a href="#top" className="mark">刻舟求剑</a><div className="nav-sections"><a href="#archive">主河</a><a href="#site">河床遗址</a><button onClick={()=>setBasketOpen(true)}>打捞篓 {salvaged.length}</button><a href="#revival">修复室</a></div><a href="#archive">MAIN 010</a></nav>
    <div className="palette-switch" aria-label="预览配色方案"><span>PALETTE</span>{(['celadon','ivory','mist'] as Palette[]).map(p=><button key={p} className={`palette-dot palette-${p} ${palette===p?'active':''}`} onClick={()=>setPalette(p)} aria-label={`切换到 ${p} 配色`}/>)}</div>

    <section className="hero" id="top"><motion.div className="hero-copy" style={{opacity:heroOpacity, scale:heroScale}}><p className="eyebrow">ARCHIVE OF DEAD PRODUCTS · 中文互联网产品考古</p><h1><span>刻舟</span><span>求剑</span></h1><div className="hero-bottom"><p>船已经走了，<br/>剑还在原地吗？</p><p>主河只留下最具代表性的遗物。<br/>其余历史，沉在河床遗址里。</p></div><a className="enter" href="#archive">进入主河 <ArrowDown size={16}/></a></motion.div><div className="hero-ring" aria-hidden="true"><span/><span/><i/></div><div className="depth">COLLECTION / 015</div></section>

    <section className="archive archive-v06" id="archive"><header className="section-head"><div><p className="eyebrow">02 / MAIN RIVER</p><h2>主河负责讲故事。<br/>不是把数据库倒进页面。</h2></div><p>精选 {mainArtifacts.length} 件代表性遗物。节点按关键事件年份定位；未完成来源核验的年份会明确标记为 provisional。</p></header><div className="timeline-key">2009—2023 · MAIN EXHIBITS {mainArtifacts.length} · EVENT YEAR POSITIONING</div><LivingRiver artifacts={mainArtifacts} onSelect={setSelected} onSalvage={toggleSalvage} salvagedIds={salvagedIds}/></section>

    <RiverSite artifacts={siteArtifacts} onSelect={setSelected} onSalvage={toggleSalvage} salvagedIds={salvagedIds}/>

    <section className="revival" id="revival"><div className="opening" aria-hidden="true"><span/><span/><span/></div><p className="eyebrow gold">04 / REVIVAL LAB</p><motion.h2 initial={{opacity:.15}} whileInView={{opacity:1}} viewport={{amount:.65}} transition={{duration:1.2}}>如果今天重新做，<br/><em>它还会死吗？</em></motion.h2><p className="revival-lead">单件遗物可以直接重算；打捞篓里的多件遗物可以进入组合 Revival，寻找共同需求与互补 Product DNA。</p>
      {revivalTargets.length ? <div className="revival-target" aria-live="polite"><span>{revivalTargets.length > 1 ? '组合打捞 / GROUP REVIVAL' : '当前打捞 / CURRENT ARTIFACT'}</span><strong>{revivalTargets.length > 1 ? `${revivalTargets.length} 件遗物：${revivalTargets.map(a=>a.name).join(' · ')}` : revivalTargets[0].name}</strong><button onClick={() => setRevivalTargets([])}>移出实验台</button></div> : <p className="revival-empty">从主河、河床遗址或打捞篓选择遗物，这里会接住它。</p>}
      <div className="transmutation">{['遗物','Product DNA','AI Opportunity','2026 MVP'].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong>{i<3&&<b>→</b>}</div>)}</div>
      <button className="primary" onClick={()=>setBlueprint(true)}>{revivalTargets.length > 1 ? `生成 ${revivalTargets.length} 件遗物的组合 Blueprint` : revivalTargets.length === 1 ? `生成「${revivalTargets[0].name}」Revival Blueprint` : '生成 Revival Blueprint'} <ArrowUpRight size={18}/></button><small className="mock-label">前端交互 Mock · 不调用真实 AI</small>
    </section>

    <section className="manifesto" id="methodology"><p className="eyebrow">05 / CLEAN ROOM MANIFESTO</p><div><h2>记住消失，<br/>不等于占有遗物。</h2><div className="manifesto-copy"><p>“刻舟求剑”不是盗版资源仓库。</p><p>不托管 ROM、破解资源、泄露源码，不复制整站内容；不把“停止维护”理解为版权消失。我们以 metadata、来源索引、历史研究和产品思想分析为主，Revival 偏向 clean-room reimplementation。</p><p className="rights">每条正式记录都应拥有可审计来源与 rights_status。</p></div></div></section>

    <footer id="about"><div><strong>刻舟求剑</strong><span>KE ZHOU QIU JIAN</span></div><div className="footer-links"><a href={repoUrl} target="_blank" rel="noreferrer"><GitBranch size={15}/> GitHub</a><a href={`${repoUrl}/issues/new?title=${encodeURIComponent('提交一个被遗忘的中文互联网产品 / Forgotten product')}`} target="_blank" rel="noreferrer">Submit a forgotten product</a><a href="#site">Riverbed Site</a><a href="#methodology">Methodology</a><button onClick={()=>nudge('MVP 0.9 · River / Site / Readiness / Concept')}>About</button></div><small>Product Archaeology for the Chinese Internet · MVP 0.9</small></footer>

    <SalvageBasket open={basketOpen} artifacts={salvaged} onOpen={()=>setBasketOpen(true)} onClose={()=>setBasketOpen(false)} onRemove={toggleSalvage} onSend={sendBasketToRevival}/>
    <ArtifactDetail artifact={selected} onClose={()=>setSelected(null)} onRevive={sendToRevival} onSalvage={toggleSalvage} isSalvaged={selected ? salvagedIds.has(selected.id) : false}/>
    <BlueprintModal open={blueprint} artifacts={revivalTargets} onClose={()=>setBlueprint(false)} onOpenConcept={openConcept}/>
    <TTPlayerRevivalConcept open={ttConceptOpen} onClose={()=>setTtConceptOpen(false)}/>
    <div className={`toast ${notice?'show':''}`} role="status">{notice}</div>
  </main>
}

export default App
