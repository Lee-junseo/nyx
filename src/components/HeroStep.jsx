import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.28, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    y: -44,
    transition: { duration: 0.52, ease: [0.55, 0, 1, 0.45] },
  },
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const ORBIT_DOTS = [
  { angle: 0,   dist: 88 },
  { angle: 62,  dist: 92 },
  { angle: 130, dist: 85 },
  { angle: 198, dist: 90 },
  { angle: 268, dist: 87 },
  { angle: 328, dist: 93 },
]

export default function HeroStep({ onStart }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="text-center flex flex-col items-center gap-9 max-w-xl w-full select-none"
    >
      {/* Logo block */}
      <motion.div variants={item} className="relative flex items-center justify-center">
        {/* Orbiting constellation dots */}
        {ORBIT_DOTS.map(({ angle, dist }, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gold"
              style={{
                width: i % 2 === 0 ? 4 : 3,
                height: i % 2 === 0 ? 4 : 3,
                left: `calc(50% + ${Math.cos(rad) * dist}px)`,
                top: `calc(50% + ${Math.sin(rad) * dist}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.4, 1] }}
              transition={{
                duration: 2.2 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.35,
              }}
            />
          )
        })}

        <h1
          className="nyx-glow font-serif font-light text-white leading-none"
          style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', letterSpacing: '0.32em', paddingLeft: '0.32em' }}
        >
          NYX
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        variants={item}
        className="font-serif text-xl md:text-[1.45rem] text-white/55 italic font-light leading-[1.75]"
      >
        가장 깊은 밤,
        <br />
        당신의 고민이 별자리가 되는 곳
      </motion.p>

      {/* Divider */}
      <motion.div variants={item} className="flex items-center gap-4 w-44">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
        <span className="text-gold/40 text-sm">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
      </motion.div>

      {/* CTA */}
      <motion.button
        variants={item}
        onClick={onStart}
        whileHover={{ scale: 1.045 }}
        whileTap={{ scale: 0.96 }}
        className="btn-primary px-11 py-4 rounded-full font-sans text-[11px] font-medium tracking-[0.2em] uppercase"
      >
        별자리 여정 시작하기
      </motion.button>

    </motion.div>
  )
}
