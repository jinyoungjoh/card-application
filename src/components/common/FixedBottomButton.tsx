import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import Button from './Button'
import { css, keyframes } from '@emotion/react'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')

  if (!$portalRoot || $portalRoot === null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        size={'medium'}
        css={buttonStyle}
        full
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0)
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(#ffffff00, #ffffff 46%);
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
  max-width: 520px;
  height: 70px;
  align-content: flex-end;
  margin: 0px auto;
`

const buttonStyle = css`
  border-radius: 8px;
`

export default FixedBottomButton
