import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import { colors } from '@styles/colorPalette'
import Flex from '@common/Flex'
import Button from '@common/Button'
import useUser from '@/hooks/auth/useUser'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/remote/firebase'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/login'].includes(location.pathname) === false
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderBtn = useCallback(() => {
    if (user !== null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/login">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderBtn()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  height: 40px;
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
export default Navbar
