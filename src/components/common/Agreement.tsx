import { MouseEvent } from 'react'
import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'
import CheckFilled from '@assets/icons/check-filled.png'
import Check from '@assets/icons/check.png'
import Spacing from './Spacing'
import { motion } from 'framer-motion'
import { colors } from '@/styles/colorPalette'

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck withCircle={true} checked={checked} />
      <Spacing size={8} direction={'horizontal'} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  link?: string
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <motion.li
      style={{
        padding: '10px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: '10px',
      }}
      whileHover={{ backgroundColor: colors.grey }}
      onClick={(e) => {
        onChange(e, !checked)
      }}
    >
      <Flex>
        <IconCheck checked={checked} />
        <Spacing size={8} direction={'horizontal'} />
        <Text typography="t6" fontWeight={'400'}>
          {children}
        </Text>
      </Flex>
      {link != null ? (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6" color={'darkGrey'}>
            {'>'}
          </Text>
        </a>
      ) : null}
    </motion.li>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return (
    <>
      {withCircle ? (
        <img
          height={24}
          width={24}
          src={CheckFilled}
          alt="check-filled"
          style={{ opacity: checked ? 1 : 0.2 }}
        />
      ) : (
        <img
          width={18}
          height={18}
          src={Check}
          alt="check"
          style={{ opacity: checked ? 1 : 0.2, padding: '2px' }}
        />
      )}
    </>
  )
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

export default Agreement
