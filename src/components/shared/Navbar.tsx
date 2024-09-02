import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  return (
    <Flex justify="space-between" align="center" css={navbarContainer}>
      <Link to="/">홈</Link>
      {showSignButton ? (
        <Link to="/signup">
          <Button>회원가입/로그인</Button>
        </Link>
      ) : null}
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
