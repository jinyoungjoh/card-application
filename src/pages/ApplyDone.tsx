import Text from '@common/Text'
import Flex from '@common/Flex'
import { parse } from 'qs'
import FixedBottomButton from '@common/FixedBottomButton'
import Spacing from '@common/Spacing'
import Success from '@assets/images/success.png'
import Warning from '@assets/images/warning.png'

function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex
      style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img width={160} src={success ? Success : Warning} alt="apply status" />
        <Spacing />
        <Text bold>
          {success === 'true'
            ? '카드가 발급되었습니다.'
            : '카드 발급에 실패했습니다.'}
        </Text>
      </Flex>
      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDone
