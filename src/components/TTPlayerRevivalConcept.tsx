import { AnimatePresence, motion } from 'framer-motion'
import { Database, FolderOpen, HardDrive, Headphones, Play, Search, ShieldCheck, Sparkles, Wand2, X } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'

type Props = { open: boolean; onClose: () => void }
type SearchMode = 'memory' | 'sonic' | 'repair'

const modes: { id: SearchMode; label: string; hint: string }[] = [
  { id: 'memory', label: '记忆搜索', hint: '用自然语言找回你记得的感觉，而不是文件名。' },
  { id: 'sonic', label: '声音相似', hint: '从用户自己的音频特征里找相似轨迹。' },
  { id: 'repair', label: '元数据修复', hint: '对照本地标签与开放元数据，先预览，再写回。' },
]

const samples = [
  '找我高中那几年常听的、下雨天会循环的女声',
  '比现在这首更安静一点，但不要纯器乐',
  '把缺年份、艺人名混乱的专辑先整理出来',
]

const tracks = [
  { title: '潮汐以北', artist: '林屿', album: '纸上天气', year: '2017', why: '2017–2019 高频播放 · 女声 · 低能量 · 雨天标签', source: 'KIOXIA SSD' },
  { title: '慢速玻璃', artist: '岛屿传真', album: '凌晨四点的街', year: '2018', why: '与你的“安静夜路”收藏声音距离接近', source: 'Mac Music' },
  { title: '灰蓝色房间', artist: '北窗', album: '无声星期天', year: '2016', why: 'Dream Pop · 低动态 · 过去 5 年未播放', source: 'NAS / Music' },
  { title: '雨停以前', artist: '山眠', album: '南方旧信', year: '2019', why: '曾与「潮汐以北」出现在同一批手工歌单', source: 'Mac Music' },
]

const sourceRows = [
  { icon: HardDrive, name: 'KIOXIA SSD', count: '12,309', sub: 'FLAC / MP3 / AAC' },
  { icon: FolderOpen, name: 'Mac Music', count: '8,412', sub: '本机文件夹' },
  { icon: Database, name: 'Home NAS', count: '4,118', sub: '只读索引' },
]

export function TTPlayerRevivalConcept({ open, onClose }: Props) {
  const [mode, setMode] = useState<SearchMode>('memory')
  const [query, setQuery] = useState(samples[0])
  const [submitted, setSubmitted] = useState(samples[0])
  const activeMode = useMemo(() => modes.find(item => item.id === mode)!, [mode])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(query.trim() || samples[0])
  }

  return <AnimatePresence>{open && <motion.div className="tt-concept-wrap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="千千静听 2026 Revival Concept">
    <button className="tt-concept-backdrop" onClick={onClose} aria-label="关闭概念原型"/>
    <motion.article className="tt-concept" initial={{y:54, scale:.985, opacity:0}} animate={{y:0, scale:1, opacity:1}} exit={{y:32, opacity:0}} transition={{duration:.55, ease:[.22,1,.36,1]}}>
      <header className="tt-head">
        <div><p>REVIVAL CONCEPT 01 · TTPLAYER / 2026</p><div className="tt-title-row"><h2>声藏</h2><span>SHENGCANG</span></div><strong>不是再做一个流媒体。<br/>而是让你拥有的音乐重新有意义。</strong></div>
        <div className="tt-head-meta"><span><ShieldCheck size={14}/> LOCAL FIRST</span><span>NO CATALOG HOSTING</span><span>CONCEPT MOCK</span></div>
        <button className="tt-close" onClick={onClose} aria-label="关闭"><X/></button>
      </header>

      <div className="tt-product-shell">
        <aside className="tt-sidebar">
          <div className="tt-brand"><Headphones size={18}/><span>我的音乐馆</span><small>24,839 tracks</small></div>
          <nav>{['今日','资料库','记忆','播放列表','修复台'].map((item,i)=><button key={item} className={i===2?'active':''}>{item}<span>{i===2?'AI':''}</span></button>)}</nav>
          <section><p>LIBRARY SOURCES</p>{sourceRows.map(({icon:Icon,name,count,sub})=><div className="tt-source" key={name}><Icon size={15}/><span><strong>{name}</strong><small>{sub}</small></span><b>{count}</b></div>)}</section>
          <footer><ShieldCheck size={14}/><span><strong>音频默认不上传</strong><small>索引、向量与播放历史可本地保存并导出</small></span></footer>
        </aside>

        <main className="tt-main">
          <div className="tt-main-intro"><p>PRIVATE MUSIC MEMORY OS</p><h3>你不需要记得歌名。</h3><span>记住一段时期、一种天气、一个模糊的声音，也应该能把音乐找回来。</span></div>

          <div className="tt-mode-tabs">{modes.map(item=><button key={item.id} className={mode===item.id?'active':''} onClick={()=>setMode(item.id)}><span>{item.label}</span><small>{item.hint}</small></button>)}</div>

          <form className="tt-search" onSubmit={submit}><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="搜索自己的音乐库"/><button type="submit"><Sparkles size={15}/> 在我的音乐里找</button></form>
          <div className="tt-query-chips">{samples.map(sample=><button key={sample} onClick={()=>{setQuery(sample);setSubmitted(sample)}}>{sample}</button>)}</div>

          <section className="tt-answer"><div className="tt-answer-head"><span><Sparkles size={15}/> {activeMode.label}</span><small>QUERY / {submitted}</small></div><p>{mode==='memory' ? '找到 18 首与你描述的“时期 + 天气 + 女声 + 循环习惯”同时接近的本地音乐。以下结果优先使用你的播放历史、手工歌单和本地标签；声音特征只做补充。' : mode==='sonic' ? '先从当前曲目的本地声音向量寻找邻近轨迹，再用你的收藏与播放习惯重排。结果不会因为商业推广改变。' : '检测到 157 个可能需要修复的标签冲突。所有修改都先显示来源与差异，不自动覆盖你的原始文件。'}</p></section>

          <div className="tt-track-list">{tracks.map((track,i)=><button className="tt-track" key={track.title}><span className="tt-track-index">0{i+1}</span><span className="tt-track-play"><Play size={13}/></span><span className="tt-track-name"><strong>{track.title}</strong><small>{track.artist} · {track.album} · {track.year}</small></span><span className="tt-track-why">{track.why}</span><span className="tt-track-source">{track.source}</span></button>)}</div>

          <div className="tt-bottom-grid">
            <section className="tt-taste"><p>TASTE GRAPH / PERSONAL, PORTABLE</p><div>{['低能量','女声','Dream Pop','2016–2019','雨天','夜路','手工歌单','很久没听'].map((tag,i)=><span key={tag} style={{['--tag-size' as string]:`${.8+i*.08}rem`}}>{tag}</span>)}</div><small>不是平台给你的画像。它可以导出，也可以删掉。</small></section>
            <section className="tt-repair"><p><Wand2 size={14}/> REPAIR QUEUE</p><div><strong>36</strong><span>艺人名冲突</span></div><div><strong>121</strong><span>缺少年份</span></div><div><strong>18</strong><span>疑似重复专辑</span></div><button>预览全部修复 →</button></section>
          </div>
        </main>

        <aside className="tt-now">
          <p>NOW PLAYING / LOCAL FILE</p><div className="tt-cover"><span>潮<br/>汐</span><i/></div><h3>潮汐以北</h3><span>林屿 · 纸上天气 · 2017</span>
          <div className="tt-wave" aria-hidden="true">{Array.from({length:28},(_,i)=><i key={i} style={{height:`${18 + ((i*17)%42)}%`,animationDelay:`-${(i%7)*.13}s`}}/>)}</div>
          <div className="tt-progress"><span/><small>02:14</small><small>04:08</small></div>
          <section className="tt-provenance"><p>WHY THIS METADATA?</p><div><span>文件内标签</span><strong>原始值保留</strong></div><div><span>MusicBrainz</span><strong>候选匹配</strong></div><div><span>声音分析</span><strong>本地向量</strong></div><div><span>你的历史</span><strong>排序信号</strong></div></section>
          <section className="tt-boundary"><ShieldCheck size={15}/><p><strong>MVP 边界</strong><span>不托管商业曲库 · 不出售听歌入口 · 不默认上传音频 · 不用黑箱覆盖文件标签</span></p></section>
        </aside>
      </div>

      <footer className="tt-concept-footer"><span>KEEP / 轻量、本地、自己的音乐</span><span>KILL / 捆绑、曲库战争、云端锁定</span><span>AI MUTATION / 记忆搜索、声音理解、可追溯修复</span></footer>
    </motion.article>
  </motion.div>}</AnimatePresence>
}
