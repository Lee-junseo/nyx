import { useState } from 'react'
import StepLayout from './StepLayout'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ConnectionStep({ onSubmit, isSubmitting, onBack }) {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const isValid = EMAIL_RE.test(email)
  const showError = touched && email.length > 0 && !isValid

  return (
    <StepLayout
      step={3}
      total={3}
      label="The Connection"
      onNext={() => onSubmit(email)}
      onBack={onBack}
      canProceed={isValid}
      nextLabel="별자리 완성하기  ✦"
      isLoading={isSubmitting}
    >
      <div className="space-y-5">
        <div>
<h2 className="font-serif text-[1.65rem] md:text-3xl text-white font-bold leading-[1.45]">
            치유의 서신을 받아보실
            <br />
            <em className="text-gold not-italic">이메일</em>을 남겨주세요.
          </h2>
        </div>

<div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="your@email.com"
            className="input-gold w-full rounded-xl px-4 py-3.5 font-sans text-sm"
          />
          {showError && (
            <p className="text-white/60 text-xs font-sans mt-2">
              올바른 이메일 형식을 입력해 주세요.
            </p>
          )}
        </div>
      </div>
    </StepLayout>
  )
}
