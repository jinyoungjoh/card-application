import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'

interface DividerProps {
  size?: number
}

const Divider = styled.div<DividerProps>`
  ${({ size = 3 }) =>
    () => ({
      height: size,
      backgroundColor: colors.grey,
    })}
`
export default Divider
