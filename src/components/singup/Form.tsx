import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import validator from 'validator'

import Flex from '@shared/Flex'
import TextFleld from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { FormValues } from '@models/signup'

function Form() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  // textField에 값을 입력했는지 확인하는 용도
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  // 값이 입력될때마다 리렌더링이 발생하여 handle함수를 매번 만듬.
  // handle함수는 외부에 의해 값이 변경되는 함수라고 판단되고,
  // useCallback으로 기억해두도록 함
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({ ...prevDirty, [e.target.name]: 'true' }))
  }, [])

  // formValues의 요소 개수가 몇개 안되서 useMemo로 변경확인(useEffect를 이용해도 됨)
  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainer}>
      <TextFleld
        label="이메일"
        name="email"
        placeholder="email@email"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="username"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        onClick={() => {}}
        disabled={제출가능한상태 === false}
      />
    </Flex>
  )
}

const formContainer = css`
  padding: 24px;
`
function validate(formValues: FormValues) {
  // 부분적으로 FormValues를 가지는 객체
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호는 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

export default Form
