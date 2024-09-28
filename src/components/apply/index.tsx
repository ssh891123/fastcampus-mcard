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

  const storageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }
    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleInfosChange = (
    infos: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infos,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleCardInfosChange = (
    cardInfos: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfos,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? <BasicInfo onNext={handleInfosChange} /> : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfosChange} />
      ) : null}
    </div>
  )
}

export default Apply
