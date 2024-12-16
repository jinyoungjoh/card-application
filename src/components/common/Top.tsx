import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title: string
  subTitle: string
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyle}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const containerStyle = css`
  padding: 24px;
`

export default Top
