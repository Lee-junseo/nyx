import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 52 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -36,
    transition: { duration: 0.42, ease: [0.55, 0, 1, 0.45] },
  },
}

export default function StepLayout({
  children,
  step,
  total = 3,
  label,
  onNext,
  onBack,
  canProceed = true,
  nextLabel = '다음으로 →',
  isLoading = false,
}) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-xl"
    >
      <div className="glass-card px-8 py-9 md:px-11 md:py-11 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          {/* 뒤로가기 버튼 */}
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors duration-200 font-sans text-xs tracking-wide"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              뒤로
            </button>
          ) : (
            label ? (
              <span className="text-gold/45 text-[10px] font-sans tracking-[0.22em] uppercase">
                {label}
              </span>
            ) : (
              <span />
            )
          )}

          {/* 진행 도트 */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full transition-all duration-700"
                style={{
                  width: i < step ? 24 : i === step - 1 ? 16 : 6,
                  background:
                    i < step
                      ? 'rgba(255,215,0,0.9)'
                      : i === step - 1
                      ? 'rgba(255,215,0,0.45)'
                      : 'rgba(255,255,255,0.12)',
                }}
              />
            ))}
          </div>
        </div>

        {children}

        {onNext && (
          <motion.button
            onClick={onNext}
            disabled={!canProceed || isLoading}
            whileHover={canProceed && !isLoading ? { scale: 1.025 } : {}}
            whileTap={canProceed && !isLoading ? { scale: 0.975 } : {}}
            className="btn-primary w-full py-3.5 rounded-xl font-sans text-[11px] font-medium tracking-[0.18em] uppercase"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2.5">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-3.5 h-3.5 border border-gold/40 border-t-gold/90 rounded-full"
                />
                전송 중…
              </span>
            ) : (
              nextLabel
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
