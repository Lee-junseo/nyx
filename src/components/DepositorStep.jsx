import { useState } from 'react'
import StepLayout from './StepLayout'

export default function DepositorStep({ value, onChange, onNext, onBack }) {
  const [touched, setTouched] = useState(false)
  const canProceed = value.trim().length >= 1
  const showError = touched && value.length > 0 && !canProceed

  return (
    <StepLayout
      step={4}
      total={5}
      onNext={onNext}
      onBack={onBack}
      canProceed={canProceed}
      nextLabel="다음으로 →"
    >
      <div className="space-y-5">
        <div>
          <h2 className="font-serif text-[1.65rem] md:text-3xl text-white font-bold leading-[1.45]">
            입금 후, <em className="text-gold not-italic">입금자명</em>을
            <br />
            알려주세요.
          </h2>
        </div>

        <p className="text-white/70 font-sans text-sm leading-relaxed">
          정확한 입금 확인을 위해 사용됩니다.
          <br />
          통장에 표시되는 이름 그대로 입력해 주세요.
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
