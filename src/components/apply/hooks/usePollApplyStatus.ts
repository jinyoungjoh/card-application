import { APPLY_STATUS } from '@/models/apply'
import { useQuery } from 'react-query'

interface usePollApplyStatusProps {
  onSuccess: () => void
  onError: () => void
  enabled: boolean
}

function usePollApplyStatus({
  onSuccess,
  onError,
  enabled,
}: usePollApplyStatusProps) {
  return useQuery(['applyStatus'], () => fetchMockApplyStatus(), {
    enabled,
    refetchInterval: 3000,
    onSuccess: (status) => {
      if (status === APPLY_STATUS.COMPLETE) {
        onSuccess()
      }
    },
    onError: () => {
      onError()
    },
  })
}

function createMockApplyStatusFetcher() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
  ]
  let index = 0

  return function fetchMockApplyStatus() {
    const status = values[index]
    index = Math.min(index + 1, values.length - 1)
    return status
  }
}

const fetchMockApplyStatus = createMockApplyStatusFetcher()

export default usePollApplyStatus
