import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useSetRecoilState } from 'recoil'
import { auth } from '@remote/firebase'
import { userAtom } from '@atoms/user'

// 인증 처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialze] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialze(true)
  })

  if (initialize === false) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
