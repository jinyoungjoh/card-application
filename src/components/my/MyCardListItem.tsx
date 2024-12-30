import { Card } from '@/models/card'
import { colors } from '@/styles/colorPalette'
import Text from '@common/Text'
import Flex from '@common/Flex'
import { css } from '@emotion/react'
import Spacing from '@common/Spacing'
import Button from '@common/Button'

function MyCardListItem({
  card,
  appliedAt,
  onDelete,
}: {
  card: Card | null
  appliedAt: Date
  onDelete: () => void
}) {
  if (!card) return <></>
  const { corpName, name, benefit } = card

  return (
    <Flex css={containerStyles} direction={'column'}>
      <Text bold typography="t7">
        {corpName}
      </Text>
      <Text typography="t3" bold>
        {name}
      </Text>
      <Spacing size={20} />
      <Flex css={benefitContainerStyle}>
        {benefit?.map((benefit, index) => (
          <Benefits benefit={benefit} key={index} />
        ))}
      </Flex>

      <Spacing />
      <Flex direction={'column'} style={{ rowGap: '8px' }}>
        <Button color={'error'} onClick={onDelete} weak>
          발급 취소하기
        </Button>
        <AppliedDate date={appliedAt} />
      </Flex>
    </Flex>
  )
}

const Benefits = ({ benefit }: { benefit: string }) => {
  return (
    <div css={benefitTagStyle}>
      <Text typography="t7" fontWeight={600}>
        {benefit}
      </Text>
    </div>
  )
}

const AppliedDate = ({ date }: { date: Date }) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return (
    <Text
      typography={'t7'}
      color={'darkGrey'}
      style={{ textAlign: 'right', fontWeight: '500', fontSize: '12px' }}
    >
      발급일시: {`${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`}
    </Text>
  )
}

const containerStyles = css`
  background-color: ${colors.grey};
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 6px;
`

const benefitContainerStyle = css`
  flex-wrap: wrap;
  gap: 10px;
`

const benefitTagStyle = css`
  padding: 6px 8px;
  background-color: #fff;
  border-radius: 4px;
`

export default MyCardListItem
