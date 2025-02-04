import { useQuery } from 'react-query'
import Skeleton from '../common/Skeleton'
import Spacing from '../common/Spacing'
import { useInView } from 'react-intersection-observer'

function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['포인트 적립 많이 됩니다.', '추천해요.'])
        }, 2000)
      })
    },
    { enabled: inView },
  )

  return (
    <div ref={ref} style={{ padding: '24px' }}>
      {isLoading ? (
        <div>
          <Skeleton width={30} height={16} />
          <Spacing size={3} />
          <Skeleton width={30} height={16} />
        </div>
      ) : (
        data.map((review, index) => <div key={index}>{review}</div>)
      )}
    </div>
  )
}

export default Review
