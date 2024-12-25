import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'
import Skeleton from './Skeleton'
import Spacing from './Spacing'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  highlight?: boolean
}

function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = 'li',
  highlight,
}: ListRowProps) {
  return (
    <Flex
      as={as}
      css={
        !highlight ? listRowContainerStyles : highLightListRowContainerStyles
      }
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const highLightListRowContainerStyles = css`
  cursor: pointer;
  border-radius: 8px;
  padding: 12px 10px;
  margin: 8px 24px;
  transition: background 0.2s ease;

  :hover {
    background-color: rgba(2, 32, 71, 0.03);
  }
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function ListRowSkeleton() {
  return (
    <Flex as={'li'} css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton

export default ListRow
