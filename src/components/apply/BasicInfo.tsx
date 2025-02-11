import {
  ANNUAL_INCOME_OPTIONS,
  CREDIT_SCORE_OPTIONS,
  PAYMENT_DATE_OPTIONS,
} from '@/constants/apply'
import { ApplyValues } from '@/models/apply'
import Select from '@common/Select'
import styled from '@emotion/styled'
import { ChangeEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../common/FixedBottomButton'
import Spacing from '@common/Spacing'

export type BasicInfoValues = Pick<
  ApplyValues,
  'salary' | 'creditScore' | 'payDate'
>

function BasicInfo({
  onNext,
}: {
  onNext: (infoValues: BasicInfoValues) => void
}) {
  const [infoValues, setInfoValues] = useState<BasicInfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const isAllSelected = Object.values(infoValues).every((value) => value)

  return (
    <Container>
      <Select
        name="salary"
        label="연소득"
        options={ANNUAL_INCOME_OPTIONS}
        placeholder={ANNUAL_INCOME_OPTIONS[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Spacing size={8} />
      <Select
        name="creditScore"
        label="신용점수"
        options={CREDIT_SCORE_OPTIONS}
        placeholder={CREDIT_SCORE_OPTIONS[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Spacing size={8} />
      <Select
        name="payDate"
        label="결제일"
        options={PAYMENT_DATE_OPTIONS}
        placeholder={PAYMENT_DATE_OPTIONS[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={isAllSelected === false}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

export default BasicInfo
