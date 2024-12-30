import Flex from '@common/Flex'
import TextField from '@common/TextField'
import FixedBottomButton from '@common/FixedBottomButton'
import Spacing from '@common/Spacing'
import { css } from '@emotion/react'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { SignUpFormValues } from '@models/signup'
import validator from 'validator'

function SignUpForm({
  onSubmit,
}: {
  onSubmit: (form: SignUpFormValues) => void
}) {
  const [form, setForm] = useState<SignUpFormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<SignUpFormValues>>({})

  const errors = useMemo(() => validate(form), [form])
  const isFormValidate = Object.keys(errors).length === 0

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: true,
    }))
  }, [])

  return (
    <Flex direction="column" css={formContainerStyle}>
      <TextField
        name="email"
        label={'이메일'}
        value={form.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) && errors.email}
        onBlur={handleBlur}
        autoFocus={true}
      />
      <Spacing />
      <TextField
        name="password"
        label={'패스워드'}
        value={form.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) && errors.password}
        onBlur={handleBlur}
      />
      <Spacing />
      <TextField
        name="rePassword"
        label={'패스워드 재확인'}
        value={form.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) && errors.rePassword}
        onBlur={handleBlur}
        type="password"
      />
      <Spacing />
      <TextField
        name="name"
        label={'이름'}
        value={form.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) && errors.name}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        label="회원가입"
        onClick={() => {
          onSubmit(form)
        }}
        disabled={isFormValidate === false}
      />
    </Flex>
  )
}

function validate(formValues: SignUpFormValues) {
  let errors: Partial<SignUpFormValues> = {}

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호 8글자 이상 입력해주세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호 8글자 이상 입력해주세요'
  } else if (!validator.equals(formValues.rePassword, formValues.password)) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

const formContainerStyle = css`
  padding: 24px;
`

export default SignUpForm
