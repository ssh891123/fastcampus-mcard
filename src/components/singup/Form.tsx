import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import TextFleld from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'

function Form() {
  return (
    <Flex direction="column" css={formContainer}>
      <TextFleld label="이메일" placeholder="email@email" />
      <Spacing size={16} />
      <TextField label="비밀번호" type="password" />
      <Spacing size={16} />
      <TextField label="비밀번호 재확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="username" />

      <FixedBottomButton label="회원가입" onClick={() => {}} disabled={true} />
    </Flex>
  )
}

const formContainer = css`
  padding: 24px;
`

export default Form
