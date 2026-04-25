import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepLayout from './StepLayout'

const ACCOUNT = '979-071320-01-016'

export default function PolarisStep({ onNext, onBack }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT)
    } catch {
      const el = document.createElement('textarea')
      el.value = ACCOUNT
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <StepLayout
      step={2}
      total={3}
      onNext={onNext}
      onBack={onBack}
      nextLabel="계속하기 →"
    >
      <div className="space-y-6">

        {/* 메인 카피 */}
        <h2 className="font-serif text-[1.5rem] md:text-[1.7rem] text-white font-bold leading-[1.5]">
          철학과 인문학의 시선으로 빚어낸 깊은 통찰을
          <br />
          한 권의 <em className="text-gold not-italic">'NYX 리포트'</em>로 전해드립니다.
        </h2>

        {/* Payment Card */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: 'rgba(255,215,0,0.05)',
            border: '1px solid rgba(255,215,0,0.25)',
          }}
        >
          {/* 가격 */}
          <div className="flex items-end gap-2">
            <span
              className="font-sans font-bold leading-none text-gold"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 3.8rem)', textShadow: '0 0 24px rgba(255,215,0,0.4)' }}
            >
              1,990원
            </span>
          </div>

          {/* 설명 */}
          <p className="text-white/75 font-sans text-sm leading-relaxed">
            단 1,990원으로 만나는 인문학적 치유 경험.
            <br />
            <span className="text-white/50 text-xs">(현재 베타 테스트 한정가)</span>
          </p>

          {/* 구분선 */}
          <div className="h-px bg-white/10" />

          {/* 계좌 정보 */}
          <div className="space-y-2">
            <p className="text-white/50 text-xs font-sans tracking-wider uppercase">입금 계좌</p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white font-sans text-sm font-medium">
                  기업은행 &nbsp;<span className="font-mono tracking-wider">{ACCOUNT}</span>
                </p>
                <p className="text-white/50 text-xs font-sans mt-0.5">예금주: 이준서</p>
              </div>

              {/* 복사 버튼 */}
              <button
                onClick={handleCopy}
                className="relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans text-xs transition-all duration-300"
                style={{
                  background: copied ? 'rgba(255,215,0,0.18)' : 'rgba(255,255,255,0.07)',
                  border: copied ? '1px solid rgba(255,215,0,0.5)' : '1px solid rgba(255,255,255,0.12)',
                  color: copied ? '#FFD700' : 'rgba(255,255,255,0.7)',
                }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="flex items-center gap-1"
                    >
                      {/* Check icon */}
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5L5.5 10L11 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      복사됨
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="flex items-center gap-1"
                    >
                      {/* Copy icon */}
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <rect x="4.5" y="4.5" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M3 8.5H2.2A1.2 1.2 0 0 1 1 7.3V2.2A1.2 1.2 0 0 1 2.2 1H7.3A1.2 1.2 0 0 1 8.5 2.2V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      복사하기
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* 진행 안내 */}
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
            <p className="text-white/75 font-sans text-sm leading-relaxed">
              입금이 확인되면 등록하신 이메일로{' '}
              <span className="text-white font-medium">7일 이내</span>에 NYX 리포트가 발송됩니다.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-gold flex-shrink-0">✦</span>
            <p className="text-white/75 font-sans text-sm">
              문의 사항 : <span className="text-white font-medium">010-5313-7287</span>
            </p>
          </div>
        </div>

      </div>
    </StepLayout>
  )
}
