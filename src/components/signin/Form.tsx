import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import validator from 'validator'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import Spacing from '@shared/Spacing'
import { FormValues } from '@models/signin'
import { Link } from 'react-router-dom'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainer}>
      <TextField
        label="이메일"
        name="email"
        placeholder="email@email.com"
        value={formValues.email}
        onChange={handleFormValues}
      ></TextField>
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
      ></TextField>
      <Spacing size={32} />

      <Button
        onClick={() => {
          onSubmit(formValues)
        }}
        disabled={제출가능한가 === false}
      >
        로그인
      </Button>

      <Spacing size={12} />

      <Link to="/signup">
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
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

  return errors
}

export default Form
