import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import cardImage from '@assets/images/card.png'
import Flex from '@common/Flex'
import Text from '@common/Text'
import Button from '@common/Button'
import { Link } from 'react-router-dom'
import Spacing from '../common/Spacing'
import { motion } from 'framer-motion'

function CardEmpty() {
  return (
    <Flex
      css={containerStyle}
      align="center"
      justify="center"
      direction={'column'}
    >
      <motion.img width={140} src={cardImage} alt="empty-card" />
      <Spacing size={10} />
      <Text color={'darkGrey'} typography="t7" style={{ fontWeight: 600 }}>
        아직 발급된 카드가 없어요😢
      </Text>
      <Link to={'/'} style={{ width: '90%' }}>
        <Button full style={{ borderRadius: '4px', padding: '12px' }}>
          이 달의 혜택카드 보러가기
        </Button>
      </Link>
    </Flex>
  )
}

const containerStyle = css`
  background-color: ${colors.grey};
  margin: 0px 24px;
  padding: 24px 0px;
  border-radius: 10px;
  row-gap: 12px;
  margin-bottom: 24px;
`

export default CardEmpty
