import useUser from '@/hooks/auth/useUser'
import UserInfo from '@/components/my/UserInfo'
import MyCardList from '@/components/my/MyCardList'

function MyPage() {
  const user = useUser()

  if (!user) return <></>

  return (
    <div>
      <UserInfo />
      <MyCardList />
    </div>
  )
}

export default MyPage
