import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { FormValues } from '@models/signin'
import { auth } from '@remote/firebase'
import Form from '@components/signin/Form'
import { useAlertContext } from '@contexts/AlertContext'

function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const state = useLocation()
  console.log('signin', state.state) //로그인 이후에 원래 페이지로 돌아가기 위한 state

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      try {
        const { email, password } = formValues
        await signInWithEmailAndPassword(auth, email, password)
        // 로그인에 성공했다면 home으로 이동
        navigate('/')
      } catch (e) {
        // firebase error
        if (e instanceof FirebaseError) {
          open({
            title: '계정 정보를 다시 확인해주세요',
            onButtonClick: () => {
              // no action
            },
          })
          return
        }

        // 일반적인 error(404 등)
        open({
          title: '잠시 후에 다시 시도해주세요',
          onButtonClick: () => {
            // no action
          },
        })
      }
    },
    [open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
