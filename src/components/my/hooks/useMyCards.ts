import { getMyCards } from '@/remote/my'
import { useQuery } from 'react-query'

function useMyCards({ userId }: { userId: string }) {
  return useQuery(['myCard', userId], () => getMyCards({ userId }))
}

export default useMyCards
