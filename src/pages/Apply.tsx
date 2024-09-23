import { useState } from 'react'

import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'

import CardInfo from '@components/apply/CardInfo'

import { ApplyValues } from '@models/apply'

function ApplyPage() {
  const [step, setStep] = useState(2)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('handleTermsChange', terms)
  }

  const handleInfosChange = (
    infos: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('handleInfosChange', infos)
  }

  const handleCardInfosChange = (
    cardInfos: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    console.log('handleCardInfosChange', cardInfos)
  }

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleInfosChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfosChange} /> : null}
    </div>
  )
}

export default ApplyPage
