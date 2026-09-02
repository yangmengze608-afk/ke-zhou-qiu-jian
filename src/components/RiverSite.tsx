import { motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { CatalogArtifact } from '../data/catalog'

const positions = [
  { left: 10, top: 18 },
  { left: 57, top: 12 },
  { left: 28, top: 50 },
  { left: 67, top: 55 },
  { left: 46, top: 78 },
]

type Props = {
  artifacts: CatalogArtifact[]
  onSelect: (artifact: CatalogArtifact) => void
  onSalvage: (artifact: CatalogArtifact) => void
  salvagedIds: Set<string>
}

export function RiverSite({ artifacts, onSelect, onSalvage, salvagedIds }: Props) {
  const reduced = useReducedMotion()

  return <section className="river-site" id="site">
    <header className="site-head">
      <div><p className="eyebrow">03 / RIVERBED SITE</p><h2>河床遗址</h2></div>
      <p>没有进入主展线，不等于没有价值。其余馆藏沉在这里，作为可以继续发掘、核验和重新分类的遗物。</p>
    </header>
    <div className="site-meta"><span>COLLECTION / {artifacts.length} 件候选馆藏</span><span>位置是展览构图，不代表时间先后</span></div>
    <div className="site-map" aria-label="河床遗址馆藏分布">
      <span className="site-axis site-axis-x">SITE / X</span><span className="site-axis site-axis-y">DEPTH / Y</span>
      {artifacts.map((artifact, index) => {
        const pos = positions[index % positions.length]
        const salvaged = salvagedIds.has(artifact.id)
        return <motion.div
          className="site-specimen"
          key={artifact.id}
          style={{ left: `${pos.left}%`, top: `${pos.top}%`, ['--specimen' as string]: artifact.exhibit.accent }}
          initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: .4 }}
        >
          <button className="site-open" onClick={() => onSelect(artifact)} aria-label={`查看 ${artifact.name} 档案`}>
            <i aria-hidden="true" />
            <small>{artifact.exhibit.collectionNo} · {artifact.category}</small>
            <strong>{artifact.name}</strong>
            <em>{artifact.exhibit.englishName}</em>
          </button>
          <button className={`site-salvage ${salvaged ? 'is-salvaged' : ''}`} onClick={() => onSalvage(artifact)} aria-label={`${salvaged ? '移出' : '加入'}打捞篓：${artifact.name}`}>
            <Plus size={13}/><span>{salvaged ? '已打捞' : '打捞'}</span>
          </button>
        </motion.div>
      })}
    </div>
  </section>
}
