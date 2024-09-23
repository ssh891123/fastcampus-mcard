import { ApplyValues } from '@models/apply'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

// data를 관리하는 component
function Apply({ step, onSubmit }: { step: number; onSubmit: () => void }) {
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

export default Apply
