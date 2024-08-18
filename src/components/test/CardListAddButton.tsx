import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { card_list } from '@/mock/data'
import { COLLECTIONS } from '@constants'

function CardListAddButton() {
  const handleButtonClick = async () => {
    // data를 store에 한 번에 밀어넣기 위해 사용
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      // batch에 차곡차곡 쌓아둠
      batch.set(docRef, card)
    })

    // store에 밀어넣음
    await batch.commit()

    alert('카드 리스트 추가 완료')
  }

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
