import { ArrowRight, X } from 'lucide-react'
import type { CatalogArtifact } from '../data/catalog'

type Props = {
  open: boolean
  artifacts: CatalogArtifact[]
  onOpen: () => void
  onClose: () => void
  onRemove: (artifact: CatalogArtifact) => void
  onSend: () => void
}

export function SalvageBasket({ open, artifacts, onOpen, onClose, onRemove, onSend }: Props) {
  return <>
    <button className={`salvage-trigger ${artifacts.length ? 'has-items' : ''}`} onClick={open ? onClose : onOpen} aria-expanded={open} aria-controls="salvage-panel">
      <span>打捞篓</span><b>{artifacts.length}</b><small>SALVAGE</small>
    </button>
    <aside className={`salvage-panel ${open ? 'open' : ''}`} id="salvage-panel" aria-label="打捞篓">
      <div className="salvage-head"><span>03 / SALVAGE BASKET</span><button onClick={onClose} aria-label="关闭打捞篓"><X size={19}/></button></div>
      <h3>把值得重算的遗物<br/>先放在一起。</h3>
      <p className="salvage-help">最多 5 件。单件可以直接进入修复室；多件会生成一份组合 Revival Blueprint。</p>
      <div className="salvage-list">
        {artifacts.length ? artifacts.map((artifact) => <div className="salvage-row" key={artifact.id}>
          <span className="salvage-swatch" style={{ background: artifact.exhibit.accent }} />
          <div><strong>{artifact.name}</strong><small>{artifact.exhibit.collectionNo} · {artifact.exhibit.englishName}</small></div>
          <button onClick={() => onRemove(artifact)} aria-label={`移出 ${artifact.name}`}><X size={16}/></button>
        </div>) : <p className="salvage-empty">篓里还是空的。先去主河或河床遗址打捞一件遗物。</p>}
      </div>
      <button className="salvage-send" onClick={onSend} disabled={!artifacts.length}>送往修复室 <ArrowRight size={16}/></button>
    </aside>
  </>
}
