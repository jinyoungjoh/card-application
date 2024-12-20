import Flex from '@common/Flex'
import Text from '@common/Text'
import useUser from '@/hooks/auth/useUser'
import Button from '@common/Button'
import { auth } from '@/remote/firebase'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'
import ProfileImage from '@/components/my/ProfileImage'
import Spacing from '@/components/common/Spacing'

function MyPage() {
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  if (!user) return <></>

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <ProfileImage size={80} mode="upload" />
      <Spacing size={20} />
      <Text bold>{user?.displayName}</Text>
      <Spacing size={10} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
