import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'
import useUser from '@hooks/auth/useUser'
import { auth } from '@remote/firebase'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])
  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainer}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainer = css`
  padding: 10px 24px;
  top: 0;
  position: sticky;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid;
`

export default Navbar
