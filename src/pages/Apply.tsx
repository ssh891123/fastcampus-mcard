import { useState } from 'react'
import Apply from '@components/apply'

//완성된 data를 실행하는 component
function ApplyPage() {
  const [step, setStep] = useState(2)

  const handleSubmit = () => {}

  return <Apply step={step} onSubmit={handleSubmit} />
}

export default ApplyPage
