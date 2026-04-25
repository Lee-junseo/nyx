import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function rand(a, b) {
  return a + Math.random() * (b - a)
}

export default function SuccessStep({ worry }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cx = canvas.width / 2
    const cy = canvas.height * 0.62

    // Particle count based on how much the user wrote
    const count = Math.max(50, Math.min(100, Math.floor(worry.length * 0.6)))

    const particles = Array.from({ length: count }, () => {
      const isGold = Math.random() < 0.22
      return {
        x: cx + rand(-100, 100),
        y: cy,
        vx: rand(-2.5, 2.5),
        vy: -(rand(0.8, 3.5)),
        size: isGold ? rand(1.8, 3.2) : rand(0.9, 2),
        opacity: 0,
        targetX: rand(canvas.width * 0.06, canvas.width * 0.94),
        targetY: rand(canvas.height * 0.06, canvas.height * 0.82),
        settleAt: rand(600, 2200),
        settled: false,
        isGold,
        phase: rand(0, Math.PI * 2),
        twinkleSpeed: rand(0.025, 0.055),
      }
    })

    const startTime = Date.now()
    let frame = 0

    function draw() {
      frame++
      const elapsed = Date.now() - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        if (elapsed < p.settleAt) {
          p.x += p.vx
          p.y += p.vy
          p.vy -= 0.012           // gentle deceleration
          p.opacity = Math.min(1, elapsed / 700)
        } else {
          p.settled = true
          p.x += (p.targetX - p.x) * 0.038
          p.y += (p.targetY - p.y) * 0.038
        }

        const twinkle = p.settled
          ? 0.55 + 0.45 * Math.sin(frame * p.twinkleSpeed + p.phase)
          : 1
        const finalOpacity = p.opacity * twinkle

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

        if (p.isGold) {
          ctx.shadowBlur = 12
          ctx.shadowColor = '#FFD700'
          ctx.fillStyle = `rgba(255,215,0,${finalOpacity})`
        } else {
          ctx.shadowBlur = 2
          ctx.shadowColor = 'rgba(255,255,255,0.5)'
          ctx.fillStyle = `rgba(255,255,255,${finalOpacity})`
        }
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Constellation lines after enough particles have settled
      if (elapsed > 2400) {
        const lineAlpha = Math.min(0.32, ((elapsed - 2400) / 1400) * 0.32)
        const settled = particles.filter((p) => p.settled)

        for (let i = 0; i < settled.length; i++) {
          for (let j = i + 1; j < settled.length; j++) {
            const dx = settled[i].x - settled[j].x
            const dy = settled[i].y - settled[j].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 165) {
              const fade = (1 - dist / 165) * lineAlpha
              ctx.beginPath()
              ctx.moveTo(settled[i].x, settled[i].y)
              ctx.lineTo(settled[j].x, settled[j].y)
              ctx.strokeStyle = `rgba(255,215,0,${fade})`
              ctx.lineWidth = 0.45
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [worry])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="relative w-full flex flex-col items-center justify-center"
      style={{ minHeight: '90vh' }}
    >
      {/* Particle / constellation canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ position: 'fixed', inset: 0, zIndex: 15 }}
      />

      {/* Success message — fades in after constellation forms */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center px-6"
        style={{ position: 'relative', zIndex: 20 }}
      >
        <motion.p
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gold text-3xl mb-7"
        >
          ✦
        </motion.p>

        <h2 className="font-serif text-[1.9rem] md:text-[2.4rem] text-white/90 font-light leading-[1.35] mb-5">
          당신의 별자리가
          <br />
          생성되었습니다
        </h2>

        <p className="text-white/42 font-sans text-sm leading-relaxed max-w-xs mx-auto">
          이야기를 들었습니다.
          <br />
          북극성이 당신에게로 향하고 있습니다.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/25" />
          <p className="text-white/20 text-[11px] font-sans tracking-wider whitespace-nowrap">
            72시간 이내 서신 도착 예정
          </p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/25" />
        </div>
      </motion.div>
    </motion.div>
  )
}
