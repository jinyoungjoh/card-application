import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus'
import FullPageLoader from '@/components/common/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { APPLY_STATUS } from '@/models/apply'
import { updateApplyCard } from '@/remote/apply'
import Apply from '@components/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려 주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다.',
}

function ApplyPage() {
  const user = useUser()
  const { open } = useAlertContext()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }
        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }
        // 신청이된 이력은 있지만, 완료는 안됐기 때문에 카드사에 다시 요청할 수 있도록 처리
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { data: status } = usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: isCardApplyInProgress } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
      // 값이 추가되었을때 => 폴링 시작
    },
    onError: () => {
      // 실패했을때
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || isCardApplyInProgress) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
