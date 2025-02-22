import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import Flex from '@common/Flex'
import Text from '@common/Text'
import Top from '@common/Top'
import ListRow from '@common/ListRow'
import { getCard } from '@remote/card'
import FixedBottomButton from '@common/FixedBottomButton'
import { useCallback } from 'react'
import useUser from '@/hooks/auth/useUser'
import { useAlertContext } from '@/contexts/AlertContext'
import { colors } from '@/styles/colorPalette'

function CardPage() {
  const { id = '' } = useParams()
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (!user) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/login')
        },
      })
      return
    }
    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion?.title) : tags.join(', ')

  return (
    <div style={{ overflow: 'hidden' }}>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              key={index}
            >
              <ListRow
                as={'div'}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion?.terms && (
        <motion.div
          transition={{
            duration: 0.8,
            ease: 'easeIn',
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <Flex direction="column" css={termsContainerStyles}>
            <Text bold={true}>유의사항</Text>
            <div css={termTextBoxStyles}>
              <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
            </div>
          </Flex>
        </motion.div>
      )}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg fill="none" height="20" viewBox="0 0 48 48" width="20">
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  if (!text) return ''
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`
const termTextBoxStyles = css`
  background-color: ${colors.grey};
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
`

export default CardPage
