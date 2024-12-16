import Top from '@common/Top'
import { getCards } from '@remote/card'
import { getAdBanners } from '@remote/adBanner'
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    getCards().then((response) => {
      console.log('getCards response: ', response)
    })

    getAdBanners().then((response) => {
      console.log('getAdBanners response: ', response)
    })
  }, [])

  return (
    <div>
      <Top
        title={'혜택 좋은 카드'}
        subTitle={'회원님을 위해서 혜택 좋은 카드를 모아봤어요'}
      />
    </div>
  )
}

export default HomePage
