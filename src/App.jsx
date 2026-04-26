import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import StarField from './components/StarField'
import HeroStep from './components/HeroStep'
import CandleStep from './components/CandleStep'
import PolarisStep from './components/PolarisStep'
import PrivacyStep from './components/PrivacyStep'
import DepositorStep from './components/DepositorStep'
import ConnectionStep from './components/ConnectionStep'
import SuccessStep from './components/SuccessStep'

const RECIPIENT = 'june2003423@gmail.com'
const STEPS = { HERO: 0, CANDLE: 1, POLARIS: 2, PRIVACY: 3, DEPOSITOR: 4, CONNECTION: 5, SUCCESS: 6 }

export default function App() {
  const [step, setStep] = useState(STEPS.HERO)
  const [formData, setFormData] = useState({
    worry: '',
    email: '',
    depositorName: '',
    consent: { required: false, dataUse: false, newsletter: false },
  })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 키보드가 열릴 때 실제 보이는 높이를 CSS 변수로 추적
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const update = () => {
      document.documentElement.style.setProperty('--actual-vh', `${vv.height}px`)
    }
    vv.addEventListener('resize', update)
    update()
    return () => vv.removeEventListener('resize', update)
  }, [])

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    })
  }, [])

  const handleSubmit = async (email) => {
    setIsSubmitting(true)
    const payload = { ...formData, email }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: RECIPIENT,
          user_email: payload.email,
          worry: payload.worry,
          depositor_name: formData.depositorName,
          consent_required: formData.consent?.required ? '동의' : '미동의',
          consent_data_use: formData.consent?.dataUse ? '동의' : '미동의',
          consent_newsletter: formData.consent?.newsletter ? '동의' : '미동의',
          sent_at: new Date().toLocaleString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
          }),
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
    } catch (err) {
      console.error('[NYX] Email delivery failed:', err)
    }

    setFormData((d) => ({ ...d, email }))
    setIsSubmitting(false)
    setStep(STEPS.SUCCESS)
  }

  return (
    <div
      className="bg-midnight overflow-x-hidden relative"
      style={{ minHeight: 'var(--actual-vh, 100svh)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Nebula background layers */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        background: `
          radial-gradient(ellipse 80% 55% at 15% 20%, rgba(60,20,120,0.28) 0%, transparent 70%),
          radial-gradient(ellipse 60% 45% at 85% 75%, rgba(20,40,110,0.22) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 60% 10%, rgba(90,10,80,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 30% 85%, rgba(10,30,90,0.18) 0%, transparent 65%)
        `
      }} />

      <StarField mousePos={mousePos} />

      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-6" style={{ minHeight: 'var(--actual-vh, 100svh)' }}>
        <AnimatePresence mode="wait">
          {step === STEPS.HERO && (
            <HeroStep key="hero" onStart={() => setStep(STEPS.CANDLE)} />
          )}
          {step === STEPS.CANDLE && (
            <CandleStep
              key="candle"
              value={formData.worry}
              onChange={(v) => setFormData((d) => ({ ...d, worry: v }))}
              onNext={() => setStep(STEPS.POLARIS)}
              onBack={() => setStep(STEPS.HERO)}
            />
          )}
          {step === STEPS.POLARIS && (
            <PolarisStep
              key="polaris"
              onNext={() => setStep(STEPS.PRIVACY)}
              onBack={() => setStep(STEPS.CANDLE)}
            />
          )}
          {step === STEPS.PRIVACY && (
            <PrivacyStep
              key="privacy"
              onNext={() => setStep(STEPS.DEPOSITOR)}
              onBack={() => setStep(STEPS.POLARIS)}
              onConsent={(consent) => setFormData((d) => ({ ...d, consent }))}
            />
          )}
          {step === STEPS.DEPOSITOR && (
            <DepositorStep
              key="depositor"
              value={formData.depositorName}
              onChange={(v) => setFormData((d) => ({ ...d, depositorName: v }))}
              onNext={() => setStep(STEPS.CONNECTION)}
              onBack={() => setStep(STEPS.PRIVACY)}
            />
          )}
          {step === STEPS.CONNECTION && (
            <ConnectionStep
              key="connection"
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onBack={() => setStep(STEPS.DEPOSITOR)}
            />
          )}
          {step === STEPS.SUCCESS && (
            <SuccessStep key="success" worry={formData.worry} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
