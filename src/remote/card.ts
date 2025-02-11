import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  getDoc,
  doc,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

export async function getCards(
  pageParam?: QuerySnapshot<Card>,
  limitCount: number = 10,
) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(limitCount))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(limitCount),
        )

  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))
  return {
    id,
    ...(snapshot.data() as Card),
  }
}
