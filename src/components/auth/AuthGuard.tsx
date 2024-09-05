import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'

// 인증 처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialze] = useState(false)

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    setInitialze(true)
  })

  if (initialize === false) {
    return <div>인증 처리중 .. 로딩중 ....</div>
  }

  return <>{children}</>
}

export default AuthGuard
