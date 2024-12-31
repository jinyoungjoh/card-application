import Button from '@common/Button'
import { collection, doc, writeBatch } from 'firebase/firestore' // Firestore 관련 함수들 import
import { adBanners } from '@/mock/data'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

// mock 데이터를 Firestore 컬렉션에 업로드하는 테스트 버튼
function AdBannerListAddButton() {
  const handleBtnClick = async () => {
    // Firestore 배치 작업 객체 생성 (한 번의 트랜잭션으로 여러 문서 추가)
    const batch = writeBatch(store)

    // mock data로부터 adBanners를 순회하면서 Firestore에 데이터 추가
    adBanners.forEach((banner) => {
      // 새로운 카드 문서 참조 생성
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))
      // 배치에 카드 데이터 추가
      batch.set(docRef, banner)
    })

    // 배치 작업을 통해 Firestore에 데이터 한 번에 저장
    await batch.commit()

    alert('배너 리스트 추가완료')
  }

  return <Button onClick={handleBtnClick}>배너 리스트 추가하기</Button>
}

export default AdBannerListAddButton
