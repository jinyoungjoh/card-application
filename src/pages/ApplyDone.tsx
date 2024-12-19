import Text from '@common/Text'
import Flex from '@common/Flex'
import { parse } from 'qs'
import FixedBottomButton from '@common/FixedBottomButton'

function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다'
          : '카드 발급에 실패했습니다.'}
      </Text>
      <FixedBottomButton
        label="확인"
        onClick={() => {
          // 앞에서 applyDone으로 넘어올때 replace를 했기 때문에 약관동의 페이지가 아닌 카드 상세 페이지로 이동함
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDone
