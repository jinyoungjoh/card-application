import BasicInfo, { BasicInfoValues } from '@/components/apply/BasicInfo'
import CardInfo, { CardInfoValues } from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues } from '@/models/apply'

function ApplyPage({ step, onSubmit }: { step: number; onSubmit: () => void }) {
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms', terms)
  }

  const handleBasicInfoChange = (basicInfoValues: BasicInfoValues) => {
    console.log(basicInfoValues)
  }

  const handleCardInfoChange = (cardInfoValues: CardInfoValues) => {
    console.log(cardInfoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}

export default ApplyPage
