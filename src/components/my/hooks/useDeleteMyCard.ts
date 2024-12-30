import { useAlertContext } from '@/contexts/AlertContext'
import { deleteMyCard } from '@/remote/my'
import { useMutation, useQueryClient } from 'react-query'

function useDeleteMyCard() {
  const { open } = useAlertContext()
  const queryClient = useQueryClient()

  return useMutation(
    ({ docId }: { docId: string }) => deleteMyCard({ docId }),
    {
      onSuccess: () => {
        open({
          title: '카드 발급 취소가 정상적으로 처리되었습니다.',
          onButtonClick: () => {
            queryClient.invalidateQueries(['myCard'])
          },
        })
      },
      onError: () => {
        open({
          title: '오류가 발생했어요. 나중에 다시 시도해주세요',
        })
      },
    },
  )
}

export default useDeleteMyCard
