import Divider from '@common/Divider'
import Spacing from '@common/Spacing'
import Text from '@common/Text'
import Flex from '@common/Flex'
import CardEmpty from './CardEmpty'
import useMyCards from './hooks/useMyCards'
import useUser from '@/hooks/auth/useUser'
import MyCardListItem from './MyCardListItem'
import useDeleteMyCard from './hooks/useDeleteMyCard'
import { AnimatePresence } from 'framer-motion'
import Animated from '@common/Animated'

function MyCardList() {
  const user = useUser()
  const { mutate } = useDeleteMyCard()
  const { data: cards, isLoading } = useMyCards({ userId: user?.uid as string })
  if (isLoading) return <></>

  return (
    <Flex direction="column">
      <Spacing size={30} />
      <Divider />
      <Flex style={{ padding: '24px' }} direction={'column'}>
        <Text typography={'t3'} bold>
          카드
        </Text>
      </Flex>
      {cards && cards.length > 0 ? (
        <div
          style={{
            padding: '0px 24px 24px 24px',
          }}
        >
          <AnimatePresence>
            {cards.map((card) => (
              <Animated animation={'fadeInDown'} key={card.cardId}>
                <MyCardListItem
                  card={card.cardDetails}
                  appliedAt={card.appliedAt.toDate()}
                  onDelete={() => {
                    mutate({ docId: card.docId })
                  }}
                />
              </Animated>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Animated animation={'fadeInDown'}>
          <CardEmpty />
        </Animated>
      )}
    </Flex>
  )
}

export default MyCardList
