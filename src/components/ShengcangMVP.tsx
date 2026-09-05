import { AnimatePresence, motion } from 'framer-motion'
import { FolderOpen, Headphones, LoaderCircle, Play, Search, ShieldCheck, Sparkles, X } from 'lucide-react'
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { dotSimilarity, embedTexts, getSemanticExtractor, SEMANTIC_MODEL, type SemanticProgress } from '../lib/localSemantic'

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
type SearchHit = { track: LocalTrack; score: number; reason: string; semantic?: number }
type SemanticState = 'off' | 'loading' | 'indexing' | 'ready' | 'error'

const audioExt = /\.(mp3|flac|m4a|wav|aac|ogg|opus)$/i
const SEMANTIC_LIMIT = 300
const SEMANTIC_BATCH = 12
const demoTracks: LocalTrack[] = [
  { id:'demo-1', title:'潮汐以北', artist:'林屿', path:'高中 / 雨天 / 2018 / 女声 / 潮汐以北.mp3', source:'DEMO DATA', demo:true },
  { id:'demo-2', title:'慢速玻璃', artist:'岛屿传真', path:'夜路 / Dream Pop / 安静 / 慢速玻璃.flac', source:'DEMO DATA', demo:true },
  { id:'demo-3', title:'灰蓝色房间', artist:'北窗', path:'2017 / 很久没听 / 低能量 / 灰蓝色房间.m4a', source:'DEMO DATA', demo:true },
]

const stripExt = (name: string) => name.replace(/\.[^.]+$/, '')
const parseName = (name: string) => {
  const stem = stripExt(name)
  const parts = stem.split(/\s[-–—]\s/)
  return parts.length > 1 ? { artist: parts[0], title: parts.slice(1).join(' - ') } : { artist: '未知艺人', title: stem }
}
const normalise = (value: string) => value.toLowerCase().replace(/[，。！？、/\\()[\]{}:_-]+/g, ' ').replace(/\s+/g, ' ').trim()
const trackText = (track: LocalTrack) => {
  const years = track.path.match(/(?:19|20)\d{2}/g)?.join(' ') ?? ''
  const folders = track.path.split('/').slice(0, -1).join(' · ')
  return `歌曲 ${track.title}。艺人 ${track.artist}。文件夹 ${folders}。路径 ${track.path}。年份 ${years}。来源 ${track.source}。`
}
const lexicalScore = (track: LocalTrack, query: string) => {
  const q = normalise(query)
  if (!q) return 0
  const terms = q.split(' ').filter(Boolean)
  const haystack = normalise(`${track.title} ${track.artist} ${track.path} ${track.source}`)
  let score = haystack.includes(q) ? 8 : 0
  for (const term of terms) if (term && haystack.includes(term)) score += 2
  return score
}

export function ShengcangMVP({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const semanticVectors = useRef<Map<string, number[]>>(new Map())
  const semanticGeneration = useRef(0)
  const [tracks, setTracks] = useState<LocalTrack[]>([])
  const [demoMode, setDemoMode] = useState(false)
  const [query, setQuery] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [semanticState, setSemanticState] = useState<SemanticState>('off')
  const [semanticMessage, setSemanticMessage] = useState('关键词检索是 baseline。语义层需要你主动启用。')
  const [semanticPercent, setSemanticPercent] = useState<number | undefined>()
  const [semanticIndexed, setSemanticIndexed] = useState(0)
  const [semanticHits, setSemanticHits] = useState<SearchHit[] | null>(null)
  const [semanticSearching, setSemanticSearching] = useState(false)

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

  useEffect(() => { setSemanticHits(null) }, [query])

  const resetSemanticIndex = () => {
    semanticGeneration.current += 1
    semanticVectors.current = new Map()
    setSemanticState('off')
    setSemanticMessage('资料库已变化。语义索引需要重新启用。')
    setSemanticPercent(undefined)
    setSemanticIndexed(0)
    setSemanticHits(null)
  }

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
    resetSemanticIndex()
    event.target.value = ''
  }

  const loadDemo = () => {
    setTracks(demoTracks)
    setDemoMode(true)
    setQuery('高中那几年下雨天听的女声')
    setCurrentId(demoTracks[0].id)
    resetSemanticIndex()
  }

  const keywordHits = useMemo<SearchHit[]>(() => {
    if (!query.trim()) return tracks.slice(0, 40).map(track => ({ track, score:0, reason:'来自你的本地资料库' }))
    return tracks.map(track => ({ track, score:lexicalScore(track, query) }))
      .filter(item => item.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 40)
      .map(item => ({ ...item, reason:'关键词命中文件名 / 艺人 / 文件夹路径' }))
  }, [tracks, query])

  const results = semanticHits ?? keywordHits
  const currentHit = results.find(hit => hit.track.id === currentId) ?? null

  const enableSemantic = async () => {
    if (!tracks.length) return
    const generation = ++semanticGeneration.current
    semanticVectors.current = new Map()
    setSemanticHits(null)
    setSemanticState('loading')
    setSemanticPercent(undefined)
    setSemanticMessage('首次启用需要下载本地 embedding 模型；模型会缓存到浏览器。')
    const progress = (row: SemanticProgress) => { if (generation === semanticGeneration.current) { setSemanticMessage(row.label); setSemanticPercent(row.percent) } }
    try {
      await getSemanticExtractor(progress)
      if (generation !== semanticGeneration.current) return
      setSemanticState('indexing')
      const target = tracks.slice(0, SEMANTIC_LIMIT)
      for (let start = 0; start < target.length; start += SEMANTIC_BATCH) {
        if (generation !== semanticGeneration.current) return
        const batch = target.slice(start, start + SEMANTIC_BATCH)
        const vectors = await embedTexts(batch.map(trackText), 'passage')
        batch.forEach((track, index) => semanticVectors.current.set(track.id, vectors[index]))
        const done = Math.min(start + batch.length, target.length)
        setSemanticIndexed(done)
        setSemanticPercent(Math.round(done / target.length * 100))
        setSemanticMessage(`正在建立本地语义索引 · ${done}/${target.length}`)
      }
      if (generation !== semanticGeneration.current) return
      setSemanticState('ready')
      setSemanticPercent(100)
      setSemanticMessage(`本地语义索引已就绪 · ${target.length} tracks · ${SEMANTIC_MODEL}`)
    } catch (error) {
      if (generation !== semanticGeneration.current) return
      console.error(error)
      setSemanticState('error')
      setSemanticMessage('语义模型加载失败。关键词检索仍然可用；可稍后重试。')
      setSemanticPercent(undefined)
    }
  }

  const runSemanticSearch = async (event?: FormEvent) => {
    event?.preventDefault()
    if (semanticState !== 'ready' || !query.trim()) return
    setSemanticSearching(true)
    try {
      const [queryVector] = await embedTexts([query], 'query')
      const ranked = tracks.slice(0, SEMANTIC_LIMIT).map(track => {
        const vector = semanticVectors.current.get(track.id)
        const semantic = vector ? dotSimilarity(queryVector, vector) : -1
        const lexical = lexicalScore(track, query)
        const hybrid = semantic + Math.min(lexical, 10) * .012
        return { track, semantic, lexical, hybrid }
      }).filter(item => item.semantic > -1).sort((a,b) => b.hybrid - a.hybrid).slice(0, 40)
      const hits = ranked.map(({track, semantic, lexical, hybrid}) => ({
        track,
        score:hybrid,
        semantic,
        reason:`本地语义相似度 ${semantic.toFixed(3)}${lexical ? ' · 另有关键词线索' : ''}`,
      }))
      setSemanticHits(hits)
      setCurrentId(hits[0]?.track.id ?? '')
    } catch (error) {
      console.error(error)
      setSemanticMessage('这次语义查询失败，已保留关键词 baseline。')
      setSemanticHits(null)
    } finally {
      setSemanticSearching(false)
    }
  }

  const sourceCount = useMemo(() => new Set(tracks.map(track => track.source)).size, [tracks])
  const directoryProps = { webkitdirectory:'', directory:'' } as Record<string,string>

  return <AnimatePresence>{open && <motion.div className="sc-mvp-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="声藏 MVP">
    <button className="sc-backdrop" onClick={onClose} aria-label="关闭声藏 MVP"/>
    <motion.article className="sc-mvp" initial={{y:42, scale:.985, opacity:0}} animate={{y:0, scale:1, opacity:1}} exit={{y:28, opacity:0}} transition={{duration:.48, ease:[.22,1,.36,1]}}>
      <header className="sc-head">
        <div><p>REVIVAL MVP 01 · TTPLAYER / 2026</p><h2>声藏 <span>SHENGCANG</span></h2><strong>让你拥有的音乐，重新可以被记起。</strong></div>
        <div className="sc-status"><span><ShieldCheck size={14}/> LOCAL FIRST</span><span>{semanticState==='ready'?'LOCAL EMBEDDINGS':'KEYWORD BASELINE'}</span></div>
        <button className="sc-close" onClick={onClose} aria-label="关闭"><X/></button>
      </header>

      <div className="sc-shell">
        <aside className="sc-library">
          <div className="sc-brand"><Headphones size={18}/><div><strong>我的音乐馆</strong><small>{tracks.length ? `${tracks.length} tracks · ${sourceCount} source${sourceCount===1?'':'s'}` : '还没有接入资料库'}</small></div></div>
          <input ref={inputRef} className="sc-hidden-input" type="file" multiple accept="audio/*,.mp3,.flac,.m4a,.wav,.aac,.ogg,.opus" onChange={onFiles} {...directoryProps}/>
          <button className="sc-import" onClick={()=>inputRef.current?.click()}><FolderOpen size={16}/> 选择本地音乐文件夹</button>
          <button className="sc-demo" onClick={loadDemo}>没有音乐文件？载入示例资料库</button>
          <section className="sc-boundary"><ShieldCheck size={16}/><div><strong>音频仍然留在你的浏览器</strong><p>语义层只处理歌名、艺人解析结果、路径和年份等文字。模型首次从网络下载并缓存，但不会为了检索上传你的音频。</p></div></section>
          <section className="sc-cut"><p>MVP CUT LIST</p><ul><li>Taste Graph → 暂删</li><li>音频情绪理解 → 尚未接入</li><li>Repair Queue → 后台能力</li><li>商业曲库 → 不做</li></ul></section>
        </aside>

        <main className="sc-main">
          <div className="sc-thesis"><p>ONE JOB TO BE DONE</p><h3>我记得那段感觉，<br/>但忘了歌名。</h3><span>现在开始做 A/B：普通关键词检索是 baseline；你主动启用后，同一个搜索框会用本地 multilingual embeddings 重排结果。</span></div>

          <form className="sc-search" onSubmit={runSemanticSearch}><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="例如：高中那几年下雨天听的女声…"/>{semanticState==='ready' ? <button type="submit" disabled={semanticSearching || !query.trim()}>{semanticSearching?<LoaderCircle size={14}/>:<Sparkles size={14}/>} 语义找</button> : <kbd>KEYWORD</kbd>}</form>
          <div className={`sc-semantic-note state-${semanticState}`}><div><b>{semanticState==='ready'?'SEMANTIC LAYER / LOCAL READY':semanticState==='off'?'SEMANTIC LAYER / OPT-IN':semanticState==='error'?'SEMANTIC LAYER / RETRY':'SEMANTIC LAYER / PREPARING'}</b><span>{semanticMessage}</span>{semanticPercent!==undefined && <i><em style={{width:`${semanticPercent}%`}}/></i>}</div>{semanticState==='off' || semanticState==='error' ? <button disabled={!tracks.length} onClick={enableSemantic}><Sparkles size={13}/> 启用本地语义</button> : semanticState==='ready' ? <small>已索引 {semanticIndexed} / {Math.min(tracks.length,SEMANTIC_LIMIT)}</small> : <LoaderCircle className="sc-spin" size={16}/>}</div>

          {!tracks.length ? <section className="sc-empty"><FolderOpen size={30}/><h4>先给它一小段你的音乐。</h4><p>选一个包含几十到几百首歌的文件夹就够。我们验证的是“接入 → 找回 → 解释 → 播放”，不是导入整个硬盘。</p><button onClick={()=>inputRef.current?.click()}>选择文件夹</button></section> : <>
            <div className="sc-results-head"><span>{semanticHits ? `SEMANTIC RESULTS / ${results.length}` : query ? `KEYWORD RESULTS / ${results.length}` : `LIBRARY / ${tracks.length}`}</span><small>{demoMode ? 'DEMO DATA · NO AUDIO' : 'LOCAL FILES · PRIVATE SESSION'}</small></div>
            <div className="sc-results">{results.length ? results.map((hit,index)=><button key={hit.track.id} className={`sc-track ${currentId===hit.track.id?'active':''}`} onClick={()=>setCurrentId(hit.track.id)}><span className="sc-index">{String(index+1).padStart(2,'0')}</span><span className="sc-play"><Play size={12}/></span><span className="sc-track-copy"><strong>{hit.track.title}</strong><small>{hit.track.artist}</small></span><span className="sc-path">{hit.track.path}</span><span className="sc-reason">{hit.reason}</span></button>) : <div className="sc-no-results"><strong>{semanticHits ? '语义索引也没有给出结果。' : '关键词 baseline 没有命中。'}</strong><span>{semanticState==='ready' && !semanticHits ? '按“语义找”看看本地 embeddings 是否能找回它。' : '这就是我们要拿来比较两种检索方式的失败样本。'}</span></div>}</div>
          </>}
        </main>

        <aside className="sc-player">
          <p>PLAY / EXPLAIN</p>
          {current ? <><div className="sc-cover"><span>{current.title.slice(0,2)}</span></div><h3>{current.title}</h3><span>{current.artist}</span>{audioUrl ? <audio controls src={audioUrl} autoPlay/> : <div className="sc-audio-placeholder">{current.demo ? '示例条目不含音频。载入你的文件夹即可真实播放。' : '选择一首本地音乐开始播放。'}</div>}<section className="sc-why"><p>WHY THIS RESULT?</p><div><span>检索信号</span><strong>{currentHit?.reason ?? '来自当前资料库'}</strong></div><div><span>文件名</span><strong>{stripExt(current.file?.name ?? current.title)}</strong></div><div><span>本地路径</span><strong>{current.path}</strong></div><div><span>数据去向</span><strong>{current.demo ? '示例数据' : '音频仅当前浏览器会话'}</strong></div></section></> : <div className="sc-player-empty">选择搜索结果后，这里负责解释并播放。</div>}
        </aside>
      </div>

      <footer className="sc-footer"><span>01 接入本地音乐</span><span>02 KEYWORD BASELINE</span><span>03 LOCAL SEMANTIC</span><span>04 解释并播放</span></footer>
    </motion.article>
  </motion.div>}</AnimatePresence>
}