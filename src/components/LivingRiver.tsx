import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Artifact } from '../types'

const pathA = 'M 500 0 C 270 175 745 360 480 610 C 245 835 770 1035 515 1280 C 285 1490 730 1705 475 1925 C 335 2050 585 2145 500 2200'
const pathB = 'M 500 0 C 385 205 630 365 500 610 C 350 845 655 1035 495 1280 C 350 1510 655 1700 495 1925 C 400 2050 565 2145 500 2200'
const pathC = 'M 500 0 C 430 205 575 390 500 610 C 420 850 590 1045 500 1280 C 410 1510 610 1710 495 1925 C 430 2050 625 2140 525 2200'

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
  const bankWidth = useTransform(scrollYProgress, [0, .25, .72, 1], reduced ? [104, 104, 104, 104] : [166, 112, 70, 126])
  const innerWidth = useTransform(scrollYProgress, [0, .35, .78, 1], reduced ? [60, 60, 60, 60] : [88, 60, 35, 74])
  const glowOpacity = useTransform(scrollYProgress, [0, .55, 1], [.13, .3, .58])
  const inletOpacity = useTransform(scrollYProgress, [0, .18, .32], reduced ? [.42, .42, .42] : [.72, .38, .08])

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
          <stop offset="0%" stopColor="#31423a" stopOpacity=".13" />
          <stop offset="48%" stopColor="#42574c" stopOpacity=".2" />
          <stop offset="82%" stopColor="#665b3b" stopOpacity=".19" />
          <stop offset="100%" stopColor="#b4975a" stopOpacity=".31" />
        </linearGradient>
        <linearGradient id="riverCore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52665c" stopOpacity=".14" />
          <stop offset="72%" stopColor="#728075" stopOpacity=".17" />
          <stop offset="100%" stopColor="#c2a465" stopOpacity=".32" />
        </linearGradient>
        <filter id="riverBlur" x="-60%" y="-10%" width="220%" height="120%"><feGaussianBlur stdDeviation="28" /></filter>
        <filter id="riverDistort" x="-45%" y="-8%" width="190%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency=".011 .004" numOctaves="2" seed="19" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="13" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <motion.g className="river-inlet" style={{ opacity: inletOpacity }}>
        <path d="M 40 0 C 150 65 320 115 500 190" /><path d="M 210 0 C 285 70 390 115 500 190" /><path d="M 790 0 C 715 75 615 120 500 190" /><path d="M 960 0 C 820 70 665 115 500 190" />
      </motion.g>
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal, strokeWidth: bankWidth, opacity: glowOpacity }} className="river-bank-glow" stroke="url(#riverInk)" filter="url(#riverBlur)" />
      <g filter={reduced ? undefined : 'url(#riverDistort)'}>
        <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal, strokeWidth: bankWidth }} className="river-bank" stroke="url(#riverInk)" />
        <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal, strokeWidth: innerWidth }} className="river-water" stroke="url(#riverCore)" />
      </g>
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal }} className="river-current river-current-main" />
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal }} className="river-current river-current-left" transform="translate(-15 0)" />
      <motion.path d={riverPath} pathLength={1} style={{ pathLength: reveal }} className="river-current river-current-right" transform="translate(17 0)" />
    </svg>

    <div className="river-depth-scale" aria-hidden="true"><span>浅滩 / SURFACE</span><span>沉积层 / ARCHIVE</span><span>改道层 / MUTATION</span><span>河口 / REVIVAL</span></div>

    {artifacts.map((artifact, i) => {
      const pos = positions[i % positions.length]
      const hasLifecycle = artifact.lifecycle.born !== null && artifact.lifecycle.ended !== null
      const timelineLabel = hasLifecycle ? `${artifact.lifecycle.born}—${artifact.lifecycle.ended}` : '年代待核验'
      const verificationLabel = artifact.verification_status === 'verified' ? 'VERIFIED' : artifact.verification_status === 'partially-verified' ? 'SOURCED' : 'UI DEMO'
      return <motion.button
        key={artifact.id}
        className={`river-artifact river-artifact-${pos.side} river-artifact-${artifact.verification_status}`}
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
          <small>0{i + 1} / {timelineLabel} · {verificationLabel}</small>
          <strong>{artifact.name}</strong>
          <em>{artifact.sources.length ? `${artifact.sources.length} 条来源 · 打捞查看证据` : '靠近 · 打捞 · 重新计算'}</em>
        </span>
      </motion.button>
    })}

    <motion.div className="river-mouth" style={{ opacity: glowOpacity }} aria-hidden="true"><span /><span /><span /><span /><span /></motion.div>
    <div className="river-exit-copy"><span>ARCHIVE ENDS HERE</span><strong>河流在这里停止记录，<br/>开始重新计算。</strong></div>
  </div>
}
