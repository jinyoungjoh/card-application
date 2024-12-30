import { COLLECTIONS } from '@/constants'
import {
  getDocs,
  query,
  collection,
  where,
  doc,
  getDoc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { store } from './firebase'
import { Card } from '@/models/card'

export async function getMyCards({ userId }: { userId: string }) {
  // 카드 신청 컬렉션에서 사용자가 발급한 카드 전체 가져오기
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      orderBy('appliedAt', 'desc'),
    ),
  )

  if (snapshot.docs.length === 0) {
    return []
  }

  // 첫 번째 결과에서 cardId와 기타 데이터 추출
  const appliedCards = snapshot.docs.map((doc) => ({
    appliedAt: doc.data().appliedAt,
    cardId: doc.data().cardId,
    userId: doc.data().userId,
    docId: doc.id, // 문서 ID도 포함
  }))

  // 카드 상세 정보 가져오기
  const cardIdToIndexMap: Record<string, number> = {}
  appliedCards.forEach((appliedCard, index) => {
    cardIdToIndexMap[appliedCard.cardId] = index
  })

  const batchPromises = appliedCards.map(({ cardId }) => {
    const cardDocRef = doc(store, COLLECTIONS.CARD, cardId as string)
    return getDoc(cardDocRef).then((docSnapshot) => ({
      cardId,
      cardDetails: docSnapshot.data() as Card,
    }))
  })

  const batchResults = await Promise.all(batchPromises)

  // 첫 번째 데이터와 카드 상세 정보 병합
  const combinedData = appliedCards.map((appliedCard) => {
    const matchingCardDetails = batchResults.find(
      (result) => result.cardId === appliedCard.cardId,
    )

    return {
      ...appliedCard,
      cardDetails: matchingCardDetails?.cardDetails || null,
    }
  })

  return combinedData
}

export async function deleteMyCard({ docId }: { docId: string }) {
  try {
    const docRef = doc(store, COLLECTIONS.CARD_APPLY, docId)
    await deleteDoc(docRef)
    console.log(`Document with ID ${docId} has been deleted`)
  } catch (error) {
    console.error(`Error deleting document with ID ${docId}:`, error)
    throw new Error(`Failed to delete document with ID ${docId}`)
  }
}
