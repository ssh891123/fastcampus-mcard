import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@models/apply'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

// data를 관리하는 component
function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const [step, setStep] = useState(0)

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })

  useEffect(() => {
    if (step === 3) {
      console.log('3 step', applyValues)
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, step, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('handleTermsChange', terms)
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleInfosChange = (
    infos: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('handleInfosChange', infos)
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infos,
    }))

    setStep((prevStep) => prevStep + 1)
  }

  const handleCardInfosChange = (
    cardInfos: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    console.log('handleCardInfosChange', cardInfos)
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfos,
    }))

    setStep((prevStep) => prevStep + 1)
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
