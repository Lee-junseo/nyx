import { useState } from 'react'
import StepLayout from './StepLayout'

export default function DepositorStep({ value, onChange, onNext, onBack }) {
  const [touched, setTouched] = useState(false)
  const canProceed = value.trim().length >= 1
  const showError = touched && value.length > 0 && !canProceed

  return (
    <StepLayout
      step={3}
      total={5}
      onNext={onNext}
      onBack={onBack}
      canProceed={canProceed}
      nextLabel="다음으로 →"
    >
      <div className="space-y-5">
        <div>
          <h2 className="font-serif text-[1.65rem] md:text-3xl text-white font-bold leading-[1.45]">
            <em className="text-gold not-italic">입금자명</em>을 알려주세요.
          </h2>
        </div>

        <p className="text-white/70 font-sans text-sm leading-relaxed">
          당신의 고민이 안전하게 보호될 수 있도록 익명성을 보장합니다.
          <br />
          실명 대신 원하시는 닉네임으로 입금하셔도 무관합니다.
          <br />
          단 송금 명의와 입력 정보가 반드시 일치해야 합니다.
        </p>

        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="홍길동"
            className="input-gold w-full rounded-xl px-4 py-3.5 font-sans text-sm"
          />
          {showError && (
            <p className="text-white/60 text-xs font-sans mt-2">
              입금자명을 입력해 주세요.
            </p>
          )}
        </div>
      </div>
    </StepLayout>
  )
}
