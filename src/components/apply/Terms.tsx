import { MouseEvent, useCallback, useState } from 'react'
import Agreement from '@shared/Agreement'
import { 약관목록 } from '@constants/apply'
import FixedBottomButton from '@shared/FixedBottomButton'

function Terms({ onNext }: { onNext: (terms: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      //01 02 전체를 순회하면서 변경
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

  const 모두약관이_동의되었는가 = Object.values(termsAgreements).every(
    (동의여부) => 동의여부,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모두약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, changed) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: changed,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="다음단계"
        disabled={모두약관이_동의되었는가 === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
