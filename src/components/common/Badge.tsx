import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import Text from './Text'

interface BadgeProps {
  label?: string
}

function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <Text bold typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 13px;
  background-color: ${colors.blue};
  padding: 3px 8px;
`

export default Badge
