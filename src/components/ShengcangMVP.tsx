import { AnimatePresence, motion } from 'framer-motion'
import { FolderOpen, Headphones, Play, Search, ShieldCheck, X } from 'lucide-react'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

type Props = { open: boolean; onClose: () => void }
type LocalTrack = {
  id: string
  title: string
  artist: string
  path: string
  source: string
  file?: File
  demo?: boolean
}

const audioExt = /\.(mp3|flac|m4a|wav|aac|ogg|opus)$/i
const demoTracks: LocalTrack[] = [
  { id:'demo-1', title:'潮汐以北', artist:'林屿', path:'高中 / 雨天 / 潮汐以北.mp3', source:'DEMO DATA', demo:true },
  { id:'demo-2', title:'慢速玻璃', artist:'岛屿传真', path:'夜路 / Dream Pop / 慢速玻璃.flac', source:'DEMO DATA', demo:true },
  { id:'demo-3', title:'灰蓝色房间', artist:'北窗', path:'2017 / 很久没听 / 灰蓝色房间.m4a', source:'DEMO DATA', demo:true },
]

const stripExt = (name: string) => name.replace(/\.[^.]+$/, '')
const parseName = (name: string) => {
  const stem = stripExt(name)
  const parts = stem.split(/\s[-–—]\s/)
  return parts.length > 1 ? { artist: parts[0], title: parts.slice(1).join(' - ') } : { artist: '未知艺人', title: stem }
}
const normalise = (value: string) => value.toLowerCase().replace(/[，。！？、/\\()[\]{}:_-]+/g, ' ').replace(/\s+/g, ' ').trim()

export function ShengcangMVP({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [tracks, setTracks] = useState<LocalTrack[]>([])
  const [demoMode, setDemoMode] = useState(false)
  const [query, setQuery] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  const current = tracks.find(track => track.id === currentId) ?? null

  useEffect(() => {
    if (!current?.file) { setAudioUrl(''); return }
    const url = URL.createObjectURL(current.file)
    setAudioUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [current])

  useEffect(() => {
    if (!open) { setCurrentId(''); setAudioUrl('') }
  }, [open])

  const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter(file => file.type.startsWith('audio/') || audioExt.test(file.name))
    const next = files.map((file, index) => {
      const parsed = parseName(file.name)
      const relative = file.webkitRelativePath || file.name
      const source = relative.includes('/') ? relative.split('/')[0] : 'LOCAL FILES'
      return { id:`local-${index}-${file.lastModified}-${file.size}`, title:parsed.title, artist:parsed.artist, path:relative, source, file }
    })
    setTracks(next)
    setDemoMode(false)
    setQuery('')
    setCurrentId(next[0]?.id ?? '')
    event.target.value = ''
  }

  const loadDemo = () => {
    setTracks(demoTracks)
    setDemoMode(true)
    setQuery('雨天')
    setCurrentId(demoTracks[0].id)
  }

  const results = useMemo(() => {
    if (!query.trim()) return tracks.slice(0, 40)
    const q = normalise(query)
    const terms = q.split(' ').filter(Boolean)
    const scored = tracks.map(track => {
      const haystack = normalise(`${track.title} ${track.artist} ${track.path} ${track.source}`)
      let score = 0
      if (haystack.includes(q)) score += 8
      for (const term of terms) if (term && haystack.includes(term)) score += 2
      return { track, score }
    }).filter(item => item.score > 0).sort((a,b) => b.score - a.score)
    return scored.map(item => item.track).slice(0, 40)
  }, [tracks, query])

  const sourceCount = useMemo(() => new Set(tracks.map(track => track.source)).size, [tracks])
  const directoryProps = { webkitdirectory:'', directory:'' } as Record<string,string>

  return <AnimatePresence>{open && <motion.div className="sc-mvp-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="声藏 MVP">
    <button className="sc-backdrop" onClick={onClose} aria-label="关闭声藏 MVP"/>
    <motion.article className="sc-mvp" initial={{y:42, scale:.985, opacity:0}} animate={{y:0, scale:1, opacity:1}} exit={{y:28, opacity:0}} transition={{duration:.48, ease:[.22,1,.36,1]}}>
      <header className="sc-head">
        <div><p>REVIVAL MVP 01 · TTPLAYER / 2026</p><h2>声藏 <span>SHENGCANG</span></h2><strong>让你拥有的音乐，重新可以被记起。</strong></div>
        <div className="sc-status"><span><ShieldCheck size={14}/> LOCAL FIRST</span><span>FUNCTIONAL PROOF</span></div>
        <button className="sc-close" onClick={onClose} aria-label="关闭"><X/></button>
      </header>

      <div className="sc-shell">
        <aside className="sc-library">
          <div className="sc-brand"><Headphones size={18}/><div><strong>我的音乐馆</strong><small>{tracks.length ? `${tracks.length} tracks · ${sourceCount} source${sourceCount===1?'':'s'}` : '还没有接入资料库'}</small></div></div>
          <input ref={inputRef} className="sc-hidden-input" type="file" multiple accept="audio/*,.mp3,.flac,.m4a,.wav,.aac,.ogg,.opus" onChange={onFiles} {...directoryProps}/>
          <button className="sc-import" onClick={()=>inputRef.current?.click()}><FolderOpen size={16}/> 选择本地音乐文件夹</button>
          <button className="sc-demo" onClick={loadDemo}>没有音乐文件？载入示例资料库</button>
          <section className="sc-boundary"><ShieldCheck size={16}/><div><strong>浏览器不会上传你的音频</strong><p>这版只在当前页面读取你主动选择的文件，并用浏览器本地 URL 播放。关闭页面后索引即消失。</p></div></section>
          <section className="sc-cut"><p>MVP CUT LIST</p><ul><li>Taste Graph → 暂删</li><li>独立 Sonic 模式 → 暂删</li><li>Repair Queue → 降为后台能力</li><li>商业曲库 → 不做</li></ul></section>
        </aside>

        <main className="sc-main">
          <div className="sc-thesis"><p>ONE JOB TO BE DONE</p><h3>我记得那段感觉，<br/>但忘了歌名。</h3><span>第一阶段先证明：用户愿不愿意接入自己的曲库，并通过一个搜索框找到、解释、播放本地音乐。</span></div>

          <label className="sc-search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜歌名、艺人、文件夹，或你自己整理过的路径标签…"/><kbd>LOCAL</kbd></label>
          <div className="sc-semantic-note"><b>SEMANTIC LAYER / NOT CONNECTED YET</b><span>当前检索真实可用，但只匹配文件名、艺人解析结果与文件夹路径。下一阶段才接本地 embeddings / 音频特征；这里不伪装成已经有 AI。</span></div>

          {!tracks.length ? <section className="sc-empty"><FolderOpen size={30}/><h4>先给它一小段你的音乐。</h4><p>选一个包含几十到几百首歌的文件夹就够。我们现在验证的是“接入 → 搜索 → 解释 → 播放”这条最短闭环，而不是导入整个硬盘。</p><button onClick={()=>inputRef.current?.click()}>选择文件夹</button></section> : <>
            <div className="sc-results-head"><span>{query ? `RESULTS / ${results.length}` : `LIBRARY / ${tracks.length}`}</span><small>{demoMode ? 'DEMO DATA · NO AUDIO' : 'LOCAL FILES · PRIVATE SESSION'}</small></div>
            <div className="sc-results">{results.length ? results.map((track,index)=><button key={track.id} className={`sc-track ${currentId===track.id?'active':''}`} onClick={()=>setCurrentId(track.id)}><span className="sc-index">{String(index+1).padStart(2,'0')}</span><span className="sc-play"><Play size={12}/></span><span className="sc-track-copy"><strong>{track.title}</strong><small>{track.artist}</small></span><span className="sc-path">{track.path}</span><span className="sc-reason">{query ? '命中文件名 / 艺人 / 路径关键词' : '来自你的本地资料库'}</span></button>) : <div className="sc-no-results"><strong>当前本地索引没有命中。</strong><span>这恰好是下一阶段要验证语义检索是否真的有增量价值的地方。</span></div>}</div>
          </>}
        </main>

        <aside className="sc-player">
          <p>PLAY / EXPLAIN</p>
          {current ? <><div className="sc-cover"><span>{current.title.slice(0,2)}</span></div><h3>{current.title}</h3><span>{current.artist}</span>{audioUrl ? <audio controls src={audioUrl} autoPlay/> : <div className="sc-audio-placeholder">{current.demo ? '示例条目不含音频。载入你的文件夹即可真实播放。' : '选择一首本地音乐开始播放。'}</div>}<section className="sc-why"><p>WHY THIS RESULT?</p><div><span>文件名</span><strong>{stripExt(current.file?.name ?? current.title)}</strong></div><div><span>本地路径</span><strong>{current.path}</strong></div><div><span>数据去向</span><strong>{current.demo ? '示例数据' : '仅当前浏览器会话'}</strong></div></section></> : <div className="sc-player-empty">选择搜索结果后，这里负责解释并播放。</div>}
        </aside>
      </div>

      <footer className="sc-footer"><span>01 接入本地音乐</span><span>02 搜索一段记忆</span><span>03 看懂为什么命中</span><span>04 直接播放</span></footer>
    </motion.article>
  </motion.div>}</AnimatePresence>
}