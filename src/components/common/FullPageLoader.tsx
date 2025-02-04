import { keyframes } from '@emotion/react'
import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'
import Doc from '@assets/images/doc.png'

const opacity = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`

function FullPageLoader({ message }: { message?: string }) {
  console.log(message)
  return (
    <Flex
      style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img width={160} src={Doc} alt="document" />
        {message && (
          <>
            <Spacing />
            <Text bold>{message}</Text>
          </>
        )}
      </Flex>
      <div
        css={{
          position: 'absolute',
          width: 160,
          height: 160,
          background: '#FFFFFF80',
          animation: `${opacity} 2s ease-in-out 0.5s infinite}`,
        }}
      />
    </Flex>
  )
}

export default FullPageLoader
