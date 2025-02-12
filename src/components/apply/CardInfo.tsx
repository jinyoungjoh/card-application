import { MouseEvent } from 'react'
import { ApplyValues } from '@/models/apply'
import Button from '@common/Button'
import Spacing from '@common/Spacing'
import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import FixedBottomButton from '../common/FixedBottomButton'

export type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>

function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  })

  const { isMaster, isHipass, isRf } = cardInfoValues

  const handleBtnClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <Container>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleBtnClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleBtnClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={26} />

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleBtnClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleBtnClick}
        >
          신청
        </Button>
      </Button.Group>
      <Spacing size={26} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleBtnClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleBtnClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

export default CardInfo
