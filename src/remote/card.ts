import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

async function getCards() {
  // getDocs로 card의 전체 data를 가져옴
  const cardSnapShot = await getDocs(collection(store, COLLECTIONS.CARD))

  // data를 가공하여 필요한 data만 반환
  return cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export default getCards
