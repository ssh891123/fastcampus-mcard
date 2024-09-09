import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, store } from '@remote/firebase'
import { FormValues } from '@models/signup'
import Form from '@/components/signup/Form'
import { COLLECTIONS } from '@constants'

function SignupPage() {
  const navigate = useNavigate()
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, { displayName: name })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    //회원가입 완료
    navigate('/')
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
