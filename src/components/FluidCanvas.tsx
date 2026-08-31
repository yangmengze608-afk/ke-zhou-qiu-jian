import { useEffect, useRef } from 'react'

export function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let visible = true
    let pointer = { x: 0.5, y: 0.5, power: 0 }
    let target = { x: 0.5, y: 0.5, power: 0 }
    let w = 0
    let h = 0
    const resize = () => {
      w = innerWidth; h = innerHeight
      const dpr = Math.min(devicePixelRatio, 1.7)
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = (e: PointerEvent) => { target = { x: e.clientX / w, y: e.clientY / h, power: .95 } }
    const leave = () => { target.power = 0 }
    const vis = () => { visible = !document.hidden }
    const draw = (time: number) => {
      pointer.x += (target.x - pointer.x) * .025
      pointer.y += (target.y - pointer.y) * .025
      pointer.power += (target.power - pointer.power) * .018
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#070908'; ctx.fillRect(0, 0, w, h)
      const lines = w < 700 ? 14 : 24
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1)
        const y = p * h
        const near = Math.exp(-Math.pow((p - pointer.y) * 5, 2)) * pointer.power
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += 18) {
          const phase = x * .009 + time * .00012 + i * .73
          const bend = Math.sin(phase) * (9 + p * 18) + Math.sin(phase * .43) * 22
          const disturbance = Math.sin((x / w - pointer.x) * 12) * 30 * near
          const py = y + bend + disturbance
          x === -20 ? ctx.moveTo(x, py) : ctx.lineTo(x, py)
        }
        ctx.strokeStyle = `rgba(${38 + i}, ${58 + i}, ${55 + i}, ${.045 + p * .045})`
        ctx.lineWidth = 1 + p * .5
        ctx.stroke()
      }
      const glow = ctx.createRadialGradient(pointer.x*w, pointer.y*h, 0, pointer.x*w, pointer.y*h, 260)
      glow.addColorStop(0, `rgba(128,145,128,${.05 * pointer.power})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h)
      if (!reduced && visible) frame = requestAnimationFrame(draw)
    }
    resize(); addEventListener('resize', resize); addEventListener('pointermove', move); addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', vis)
    draw(0)
    if (!reduced) frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize); removeEventListener('pointermove', move); removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return <canvas ref={ref} className="fluid" aria-hidden="true" />
}
