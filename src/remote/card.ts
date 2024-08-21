import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

// pageParam: 지금 보이는 맨 마지막 요소
async function getCards(pageParam?: QuerySnapshot) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  // getDocs로 card data를 가져옴
  const cardSnapShot = await getDocs(cardQuery)

  const lastVisible = cardSnapShot.docs[cardSnapShot.docs.length - 1]

  // data를 가공하여 필요한 data만 반환
  const items = cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export default getCards
