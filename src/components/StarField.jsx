import { useEffect, useRef } from 'react'

const STAR_COUNT = 230

function rand(a, b) {
  return a + Math.random() * (b - a)
}

export default function StarField({ mousePos }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ stars: [], shootingStar: null, frame: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function initStars(w, h) {
      stateRef.current.stars = Array.from({ length: STAR_COUNT }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.25, 1.7),
        baseOpacity: rand(0.35, 1),
        twinkleSpeed: rand(0.007, 0.028),
        phase: rand(0, Math.PI * 2),
        isGold: Math.random() < 0.07,
      }))
    }

    function resize() {
      canvas.width = window.innerWidth + 80
      canvas.height = window.innerHeight + 80
      initStars(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    function spawnShootingStar() {
      stateRef.current.shootingStar = {
        x: rand(canvas.width * 0.25, canvas.width),
        y: rand(0, canvas.height * 0.35),
        vx: rand(-7, -3.5),
        vy: rand(2, 5.5),
        len: rand(90, 170),
        life: 1,
      }
    }

    const ssTimer = setInterval(spawnShootingStar, 9000)
    setTimeout(spawnShootingStar, 1800)

    function draw() {
      const { stars, frame } = stateRef.current
      stateRef.current.frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Stars
      stars.forEach((s) => {
        const t = Math.sin(frame * s.twinkleSpeed + s.phase)
        const opacity = s.baseOpacity * (0.55 + t * 0.45)

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)

        if (s.isGold) {
          ctx.shadowBlur = 7
          ctx.shadowColor = 'rgba(255,215,0,0.7)'
          ctx.fillStyle = `rgba(255,215,0,${opacity})`
        } else {
          ctx.shadowBlur = 0
          ctx.fillStyle = `rgba(255,255,255,${opacity})`
        }
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Shooting star
      const ss = stateRef.current.shootingStar
      if (ss) {
        ss.x += ss.vx
        ss.y += ss.vy
        ss.life -= 0.017

        if (ss.life > 0) {
          const tailLen = ss.len / 6
          const grad = ctx.createLinearGradient(
            ss.x, ss.y,
            ss.x - ss.vx * tailLen,
            ss.y - ss.vy * tailLen
          )
          grad.addColorStop(0, `rgba(255,255,255,${ss.life})`)
          grad.addColorStop(0.4, `rgba(255,215,0,${ss.life * 0.55})`)
          grad.addColorStop(1, 'rgba(255,215,0,0)')

          ctx.beginPath()
          ctx.moveTo(ss.x, ss.y)
          ctx.lineTo(ss.x - ss.vx * tailLen, ss.y - ss.vy * tailLen)
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.6
          ctx.stroke()
        } else {
          stateRef.current.shootingStar = null
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(ssTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{
        top: -40,
        left: -40,
        width: 'calc(100% + 80px)',
        height: 'calc(100% + 80px)',
        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
        transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
        willChange: 'transform',
      }}
    />
  )
}
