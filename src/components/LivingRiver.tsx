import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Artifact } from '../types'

const pathA = 'M 500 0 C 280 180 735 360 485 610 C 255 840 760 1040 520 1280 C 300 1500 720 1700 485 1925 C 350 2050 565 2145 500 2200'
const pathB = 'M 500 0 C 390 210 625 365 505 610 C 360 850 650 1030 500 1280 C 355 1510 650 1700 500 1925 C 410 2050 555 2145 500 2200'
const pathC = 'M 500 0 C 430 205 570 390 500 610 C 425 850 585 1045 505 1280 C 420 1510 605 1710 500 1925 C 440 2055 610 2140 520 2200'

const positions = [
  { top: 7, left: 12, side: 'left' },
  { top: 23, left: 60, side: 'right' },
  { top: 39, left: 7, side: 'left' },
  { top: 55, left: 63, side: 'right' },
  { top: 71, left: 15, side: 'left' },
  { top: 87, left: 58, side: 'right' },
] as const

type Props = {
  artifacts: Artifact[]
  onSelect: (artifact: Artifact) => void
}

export function LivingRiver({ artifacts, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const riverPath = useTransform(scrollYProgress, [0, .52, 1], reduced ? [pathB, pathB, pathB] : [pathA, pathB, pathC])
  const reveal = useTransform(scrollYProgress, [.02, .86], [.06, 1])
  const bankWidth = useTransform(scrollYProgress, [0, .25, .72, 1], reduced ? [118, 118, 118, 118] : [205, 132, 84, 150])
  const innerWidth = useTransform(scrollYProgress, [0, .35, .78, 1], reduced ? [72, 72, 72, 72] : [116, 76, 48, 94])
  const glowOpacity = useTransform(scrollYProgress, [0, .55, 1], [.16, .34, .62])

  const pointerX = useMotionValue(-200)
  const pointerY = useMotionValue(-200)
  const glowX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: .55 })
  const glowY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: .55 })

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    pointerX.set(event.clientX - box.left)
    pointerY.set(event.clientY - box.top)
  }

  const leave = () => {
    pointerX.set(-200)
    pointerY.set(-200)
  }

  return <div className="living-river" ref={ref} onPointerMove={move} onPointerLeave={leave}>
    <motion.div className="river-pointer-field" style={{ x: glowX, y: glowY }} aria-hidden="true" />

    <svg className="river-svg" viewBox="0 0 1000 2200" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="riverInk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#31423a" stopOpacity=".16" />
          <stop offset="48%" stopColor="#42574c" stopOpacity=".24" />
          <stop offset="82%" stopColor="#665b3b" stopOpacity=".22" />
          <stop offset="100%" stopColor="#b4975a" stopOpacity=".34" />
        </linearGradient>
        <linearGradient id="riverCore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52665c" stopOpacity=".18" />
          <stop offset="72%" stopColor="#728075" stopOpacity=".2" />
          <stop offset="100%" stopColor="#c2a465" stopOpacity=".38" />
        </linearGradient>
        <filter id="riverBlur" x="-60%" y="-10%" width="220%" height="120%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal, strokeWidth: bankWidth, opacity: glowOpacity }} className="river-bank-glow" stroke="url(#riverInk)" filter="url(#riverBlur)" />
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal, strokeWidth: bankWidth }} className="river-bank" stroke="url(#riverInk)" />
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal, strokeWidth: innerWidth }} className="river-water" stroke="url(#riverCore)" />
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal }} className="river-current" />
    </svg>

    <div className="river-depth-scale" aria-hidden="true">
      <span>浅滩 / SURFACE</span>
      <span>沉积层 / ARCHIVE</span>
      <span>改道层 / MUTATION</span>
      <span>河口 / REVIVAL</span>
    </div>

    {artifacts.map((artifact, i) => {
      const pos = positions[i % positions.length]
      return <motion.button
        key={artifact.id}
        className={`river-artifact river-artifact-${pos.side}`}
        style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
        onClick={() => onSelect(artifact)}
        initial={reduced ? false : { opacity: 0, y: 48, filter: 'blur(8px)' }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-18% 0px -18% 0px' }}
        transition={{ duration: .9, ease: [.22, 1, .36, 1] }}
        aria-label={`打捞 ${artifact.name}，进入产品考古`}
      >
        <span className="river-artifact-pulse" aria-hidden="true" />
        <span className="river-artifact-marker" aria-hidden="true"><i/><i/></span>
        <span className="river-artifact-copy">
          <small>0{i + 1} / 年代待核验</small>
          <strong>{artifact.name}</strong>
          <em>靠近 · 打捞 · 重新计算</em>
        </span>
      </motion.button>
    })}

    <motion.div className="river-mouth" style={{ opacity: glowOpacity }} aria-hidden="true">
      <span />
      <span />
      <span />
    </motion.div>

    <div className="river-exit-copy">
      <span>ARCHIVE ENDS HERE</span>
      <strong>河流在这里停止记录，<br/>开始重新计算。</strong>
    </div>
  </div>
}
