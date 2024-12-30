import Flex from '@common/Flex'
import TextField from '@common/TextField'
import Button from '@common/Button'
import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
  KeyboardEvent,
} from 'react'
import Spacing from '@common/Spacing'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Text from '@common/Text'
import { colors } from '@/styles/colorPalette'
import validator from 'validator'
import { LoginFormValues } from '@/models/login'

function LoginForm({
  onSubmit,
}: {
  onSubmit: (form: LoginFormValues) => void
}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(form), [form])
  const isFormValidate = Object.keys(errors).length === 0

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && isFormValidate) {
        onSubmit(form)
      }
    },
    [form, isFormValidate, onSubmit],
  )

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="이메일" name="email" onChange={handleFormValues} />
      <Spacing />
      <TextField
        label="패스워드"
        name="password"
        onChange={handleFormValues}
        onKeyDown={handleKeyDown}
        type="password"
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={isFormValidate === false}
        onClick={() => {
          onSubmit(form)
        }}
      >
        로그인
      </Button>
      <Link to={'/signup'} css={linkStyles}>
        <Spacing size={12} />
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

function validate(formValues: LoginFormValues) {
  let errors: Partial<LoginFormValues> = {}

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호 8글자 이상 입력해주세요'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

export default LoginForm
