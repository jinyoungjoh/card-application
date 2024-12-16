import Button from '@common/Button'
import { collection, doc, writeBatch } from 'firebase/firestore' // Firestore 관련 함수들 import
import { card_list } from '@/mock/data'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

// mock 데이터를 Firestore 컬렉션에 업로드하는 테스트 버튼
function CardListAddButton() {
  const handleBtnClick = async () => {
    // Firestore 배치 작업 객체 생성 (한 번의 트랜잭션으로 여러 문서 추가)
    const batch = writeBatch(store)

    // mock data로부터 card_list를 순회하면서 Firestore에 데이터 추가
    card_list.forEach((card) => {
      // 새로운 카드 문서 참조 생성
      const docRef = doc(collection(store, COLLECTIONS.CARD))
      // 배치에 카드 데이터 추가
      batch.set(docRef, card)
    })

    // 배치 작업을 통해 Firestore에 데이터 한 번에 저장
    await batch.commit()

    alert('카드 리스트 추가완료')
  }

  return <Button onClick={handleBtnClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
