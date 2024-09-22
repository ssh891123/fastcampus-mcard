import { ChangeEvent, useCallback, useState } from 'react'
import Select from '@shared/Selected'
import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import { ApplyValues } from '@models/apply'
import FixedBottomButton from '@shared/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
// 기본 정보 페이지
function BasicInfo({ onNext }: { onNext: (value: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handlerInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 모두정보가선택하였는가 = Object.values(infoValues).every(
    (value) => value,
  )

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handlerInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handlerInfoChange}
      ></Select>
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handlerInfoChange}
      ></Select>

      <FixedBottomButton
        label="다음 단계"
        disabled={모두정보가선택하였는가 === false}
        onClick={() => {
          onNext(infoValues)
        }}
      />
    </div>
  )
}

export default BasicInfo
