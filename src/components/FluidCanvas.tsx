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
    let visible = !document.hidden
    let w = 0
    let h = 0
    let pointer = { x: 0.5, y: 0.5, power: 0 }
    let target = { x: 0.5, y: 0.5, power: 0 }
    let morph = 0
    let morphTarget = 0

    const resize = () => {
      w = innerWidth
      h = innerHeight
      const dpr = Math.min(devicePixelRatio, 1.7)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const move = (e: PointerEvent) => {
      target = { x: e.clientX / Math.max(w, 1), y: e.clientY / Math.max(h, 1), power: .95 }
    }

    const leave = () => { target.power = 0 }

    const updateScroll = () => {
      morphTarget = Math.min(Math.max(scrollY / Math.max(h * 1.75, 1), 0), 1)
    }

    const paint = (time: number) => {
      pointer.x += (target.x - pointer.x) * .025
      pointer.y += (target.y - pointer.y) * .025
      pointer.power += (target.power - pointer.power) * .018
      morph += (morphTarget - morph) * .035

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#070908'
      ctx.fillRect(0, 0, w, h)

      const horizontalLines = w < 700 ? 12 : 22
      const horizontalAlpha = 1 - morph * .82
      for (let i = 0; i < horizontalLines; i++) {
        const p = i / Math.max(horizontalLines - 1, 1)
        const y = p * h
        const near = Math.exp(-Math.pow((p - pointer.y) * 5, 2)) * pointer.power
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += 18) {
          const phase = x * .009 + time * .00012 + i * .73
          const bend = Math.sin(phase) * (9 + p * 18) + Math.sin(phase * .43) * 22
          const disturbance = Math.sin((x / Math.max(w, 1) - pointer.x) * 12) * 30 * near
          const py = y + bend + disturbance
          x === -20 ? ctx.moveTo(x, py) : ctx.lineTo(x, py)
        }
        ctx.strokeStyle = `rgba(${38 + i}, ${58 + i}, ${55 + i}, ${(0.04 + p * .04) * horizontalAlpha})`
        ctx.lineWidth = 1 + p * .45
        ctx.stroke()
      }

      const verticalLines = w < 700 ? 5 : 9
      for (let i = 0; i < verticalLines; i++) {
        const offset = (i - (verticalLines - 1) / 2) * (w < 700 ? 8 : 14)
        ctx.beginPath()
        for (let y = -20; y <= h + 20; y += 18) {
          const phase = y * .006 + time * .0001 + i * .8
          const meander = Math.sin(phase) * (28 + morph * 34) + Math.sin(phase * .41) * 20
          const pointerY = y / Math.max(h, 1)
          const near = Math.exp(-Math.pow((pointerY - pointer.y) * 5, 2)) * pointer.power
          const disturbance = Math.sin((pointerY - pointer.y) * 10) * 18 * near
          const x = w * .5 + offset + meander + disturbance
          y === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${69 + i}, ${88 + i}, ${77 + i}, ${(.015 + i * .002) * morph})`
        ctx.lineWidth = 1 + morph * .45
        ctx.stroke()
      }

      const glow = ctx.createRadialGradient(pointer.x*w, pointer.y*h, 0, pointer.x*w, pointer.y*h, 260)
      glow.addColorStop(0, `rgba(128,145,128,${.05 * pointer.power})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)
    }

    const loop = (time: number) => {
      paint(time)
      if (!reduced && visible) frame = requestAnimationFrame(loop)
    }

    const handleVisibility = () => {
      visible = !document.hidden
      if (!reduced && visible) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(loop)
      }
    }

    resize()
    updateScroll()
    paint(0)

    addEventListener('resize', resize)
    addEventListener('scroll', updateScroll, { passive: true })
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', handleVisibility)

    if (!reduced) frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('resize', resize)
      removeEventListener('scroll', updateScroll)
      removeEventListener('pointermove', move)
      removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return <canvas ref={ref} className="fluid" aria-hidden="true" />
}
