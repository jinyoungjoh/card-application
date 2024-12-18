import { MouseEvent } from 'react'
import { TERM_LIST } from '@/constants/apply'
import Agreement from '@common/Agreement'
import { useCallback, useState } from 'react'
import FixedBottomButton from '../common/FixedBottomButton'
import Spacing from '../common/Spacing'

function Terms({ onNext }: { onNext: (terms: string[]) => void }) {
  const [termsAgreement, setTermsAgreements] = useState(() => {
    return TERM_LIST.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const areAllTermsAgreed = Object.values(termsAgreement).every(
    (isAgreed) => isAgreed,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={areAllTermsAgreed}
          onChange={handleAllAgreement}
        >
          약간에 모두 동의
        </Agreement.Title>
        <Spacing size={8} />
        {TERM_LIST.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreement[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={areAllTermsAgreed === false}
        onClick={() => {
          onNext(Object.keys(termsAgreement))
        }}
      />
    </div>
  )
}

export default Terms
