import { useState } from 'react'
import StepLayout from './StepLayout'

function Section({ title, children }) {
  return (
    <div className="space-y-1">
      <p className="font-sans font-semibold text-white" style={{ fontSize: '11px', letterSpacing: '0.03em' }}>
        {title}
      </p>
      <div className="font-sans text-white leading-relaxed" style={{ fontSize: '11px' }}>
        {children}
      </div>
    </div>
  )
}

function Checkbox({ checked, onChange, badge, children }) {
  return (
    <button type="button" onClick={onChange} className="flex gap-2.5 text-left w-full group">
      <div
        className="flex-shrink-0 rounded transition-all duration-200 flex items-center justify-center"
        style={{
          marginTop: '2px',
          width: 16,
          height: 16,
          background: checked ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)',
          border: checked ? '1px solid rgba(255,215,0,0.75)' : '1px solid rgba(255,255,255,0.22)',
        }}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="#FFD700" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        className="font-sans leading-relaxed text-white transition-colors"
        style={{ fontSize: '11.5px' }}
      >
        {children}
        <span
          className="ml-1.5 font-medium"
          style={{ fontSize: '10px', color: badge === '필수' ? '#FFD700' : 'rgba(255,255,255,0.45)' }}
        >
          ({badge})
        </span>
      </span>
    </button>
  )
}

function AgreeAllCheckbox({ checked, onChange }) {
  return (
    <button type="button" onClick={onChange} className="flex gap-2.5 text-left w-full group">
      <div
        className="flex-shrink-0 rounded transition-all duration-200 flex items-center justify-center"
        style={{
          marginTop: '2px',
          width: 16,
          height: 16,
          background: checked ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.04)',
          border: checked ? '1px solid rgba(255,215,0,0.9)' : '1px solid rgba(255,255,255,0.3)',
        }}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2" stroke="#FFD700" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="font-sans font-semibold text-white" style={{ fontSize: '12px' }}>
        전체 동의
      </span>
    </button>
  )
}

export default function PrivacyStep({ onNext, onBack, onConsent }) {
  const [checked, setChecked] = useState({ required: false, dataUse: false, newsletter: false })

  const allChecked = checked.required && checked.dataUse && checked.newsletter

  const toggle = (key) => setChecked((c) => ({ ...c, [key]: !c[key] }))

  const toggleAll = () => {
    const next = !allChecked
    setChecked({ required: next, dataUse: next, newsletter: next })
  }

  const handleNext = () => {
    onConsent(checked)
    onNext()
  }

  return (
    <StepLayout
      step={3}
      total={5}
      onNext={handleNext}
      onBack={onBack}
      canProceed={checked.required}
      nextLabel="동의하고 계속하기 →"
    >
      <div className="space-y-4">
        <div>
          <h2 className="font-serif text-[1.35rem] text-white font-bold leading-[1.4]">
            개인정보 처리방침
          </h2>
          <p className="font-sans mt-1" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
            시행일: 2026년 4월 25일
          </p>
        </div>

        {/* Scrollable policy body */}
        <div
          className="overflow-y-auto rounded-xl px-4 py-3.5 space-y-3.5"
          style={{
            maxHeight: '210px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <p className="font-sans leading-relaxed text-white" style={{ fontSize: '11px' }}>
            NYX(이하 "서비스")는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」을
            준수하기 위해 본 처리방침을 수립·공개합니다.
          </p>

          <Section title="제1조 (수집 항목 및 방법)">
            <p>필수: 이메일 주소, 사연 본문 / 선택: 닉네임 / 자동: 접수 일시, 결제자명·이메일·거래번호</p>
            <p className="mt-0.5">수집 방법: 서비스 웹사이트 내 사연 접수 폼을 통한 이용자 자발적 입력</p>
          </Section>

          <Section title="제2조 (민감정보의 처리)">
            <p>
              사연 본문에 정신건강 상태, 신념, 정치적 견해, 성적 지향 등 민감정보가 포함될 수 있습니다.
              사연 본문은 답신 작성 외 목적으로 사용되지 않으며, 외부에 공개·제공되지 않습니다.
              비식별 감정 데이터 활용 시 별도의 사전 동의를 받습니다.
            </p>
          </Section>

          <Section title="제3조 (이용 목적)">
            <p>【필수】 답신 작성 및 이메일 발송, 결제·환불 처리, 서비스 운영 안내, 이용자 문의 응대</p>
            <p className="mt-0.5">
              【선택·별도 동의】 비식별 감정 데이터(정서 키워드, 주제 분류, 답신 패턴, 통계 추이)를
              서비스 개선·콘텐츠 제작·연구 목적으로 활용. 이름·이메일·원문은 사용하지 않으며,
              동의 거부 시에도 답신은 정상 발송됩니다.
            </p>
          </Section>

          <Section title="제4조 (보유 및 이용 기간)">
            <ul className="space-y-0.5 list-disc list-inside">
              <li>사연·답신 기록: 답신 발송일로부터 6개월 (즉시 삭제 요청 시 7일 이내 파기)</li>
              <li>이메일 주소: 발송 완료 후 즉시 파기 (뉴스레터 동의 시 1년 보관)</li>
              <li>비식별 감정 데이터: 동의 철회 시 즉시 처리 중단</li>
              <li>결제 기록: 전자상거래법에 따라 5년 보관</li>
            </ul>
          </Section>

          <Section title="제5조 (처리 위탁)">
            <ul className="space-y-0.5 list-disc list-inside">
              <li>Google LLC (Gmail): 이메일 송수신 — 위탁 목적 달성 시까지</li>
              <li>OpenAI / Anthropic: 답신 초안 AI 생성 (학습 미사용) — API 호출 종료 즉시 파기</li>
            </ul>
          </Section>

          <Section title="제6조 (제3자 제공)">
            <p>
              원칙적으로 외부에 제공하지 않습니다. 예외: 이용자 사전 동의, 법령에 의한 수사기관
              요청, 생명·신체에 대한 급박한 위험 방지.
            </p>
          </Section>

          <Section title="제7조 (이용자의 권리)">
            <p>
              열람·정정·삭제·처리 정지·동의 철회 요청 가능.
              이메일(june2003423@gmail.com)로 요청 시 7일 이내 처리합니다.
            </p>
          </Section>

          <Section title="제8조 (파기 절차 및 방법)">
            <p>
              보유 기간 경과 또는 목적 달성 시 지체 없이 파기합니다.
              전자 파일은 복구 불가능한 방식으로 영구 삭제합니다.
            </p>
          </Section>

          <Section title="제9조 (안전성 확보 조치)">
            <ul className="space-y-0.5 list-disc list-inside">
              <li>HTTPS 암호화 통신 적용</li>
              <li>이메일·운영 도구 2단계 인증 설정</li>
              <li>AI API 호출 시 식별 정보(이메일·이름) 제외, 사연 본문만 전송</li>
            </ul>
          </Section>

          <Section title="제10조 (개인정보 보호책임자)">
            <p>이준서 · june2003423@gmail.com</p>
            <p className="mt-0.5">
              침해신고: privacy.kisa.or.kr / 118 · 개인정보보호위원회: pipc.go.kr ·
              대검찰청: spo.go.kr / 1301 · 경찰청: ecrm.cyber.go.kr / 182
            </p>
          </Section>

          <Section title="제11조 (위기 상황 안내)">
            <p>
              NYX는 정신건강 의료 서비스가 아닙니다. 위기 상황이 감지될 경우 답신 대신
              전문 기관 안내를 우선 제공합니다.
            </p>
            <p className="mt-0.5">
              자살예방: 109 · 정신건강위기: 1577-0199 · 청소년: 1388 (모두 24시간 무료)
            </p>
          </Section>

          <Section title="제12조 (방침의 변경)">
            <p>
              법령·서비스 정책 변경에 따라 수정될 수 있으며, 변경 시 웹사이트를 통해 사전 공지합니다.
              최종 개정일: 2026년 4월 25일
            </p>
          </Section>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

        {/* Consent checkboxes */}
        <div className="space-y-3">
          {/* 전체 동의 */}
          <AgreeAllCheckbox checked={allChecked} onChange={toggleAll} />

          {/* 개별 항목 구분선 */}
          <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <Checkbox checked={checked.required} onChange={() => toggle('required')} badge="필수">
            NYX의 개인정보 처리방침을 확인하였으며, 답신 발송을 위해 이메일 주소와 사연 내용을
            수집·이용하는 것에 동의합니다.
          </Checkbox>
          <Checkbox checked={checked.dataUse} onChange={() => toggle('dataUse')} badge="선택">
            사연에서 도출된 비식별 감정 데이터(정서 키워드, 주제 분류 등)를 서비스 개선,
            콘텐츠 제작, 연구 목적으로 활용하는 것에 동의합니다. 동의하지 않아도 답신은
            정상 발송됩니다.
          </Checkbox>
          <Checkbox checked={checked.newsletter} onChange={() => toggle('newsletter')} badge="선택">
            향후 NYX의 운영 소식과 서신 안내를 받기 위해 이메일 주소를 1년간 보관하는 것에
            동의합니다.
          </Checkbox>
        </div>
      </div>
    </StepLayout>
  )
}
