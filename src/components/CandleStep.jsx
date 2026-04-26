import { useRef } from 'react'
import StepLayout from './StepLayout'

export default function CandleStep({ value, onChange, onNext, onBack }) {
  const textareaRef = useRef(null)
  const canProceed = value.trim().length >= 10

  return (
    <StepLayout
      step={1}
      total={5}
      label=""
      onNext={onNext}
      onBack={onBack}
      canProceed={canProceed}
      nextLabel="다음으로 →"
    >
      <div className="space-y-5">
        <div>
<h2 className="font-serif text-[1.65rem] md:text-3xl text-white font-bold leading-[1.45]">
            지금 당신의 마음을 무겁게 만드는
            <br />
            <em className="text-gold not-italic">'어둠'</em>은 무엇인가요?
          </h2>
        </div>

        <p className="text-white/70 font-sans text-sm leading-relaxed">
          당신의 마음을 직시하는 것은 필요합니다.
          <br />
          충분히 바라보시고, 천천히 적어주세요.
        </p>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              setTimeout(() => {
                textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 350)
            }}
            placeholder="지금 이 순간의 감정, 상황, 걱정되는 것들을 자유롭게 적어주세요…"
            rows={6}
            className="input-gold w-full rounded-xl px-4 py-3.5 font-sans text-sm leading-relaxed"
          />
          <span className="absolute bottom-3 right-3.5 text-white/45 text-xs font-sans pointer-events-none">
            {value.length}자
          </span>
        </div>

        {value.length > 0 && value.trim().length < 10 && (
          <p className="text-white/60 text-xs font-sans">
            조금 더 이야기해 주세요 (10자 이상)
          </p>
        )}
      </div>
    </StepLayout>
  )
}
