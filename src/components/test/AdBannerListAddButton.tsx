import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { adBanners } from '@/mock/data'
import { COLLECTIONS } from '@constants'

function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    // data를 store에 한 번에 밀어넣기 위해 사용
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))

      // batch에 차곡차곡 쌓아둠
      batch.set(docRef, banner)
    })

    // store에 밀어넣음
    await batch.commit()

    alert('배너 리스트 추가 완료')
  }

  return <Button onClick={handleButtonClick}>배너 리스트 추가하기</Button>
}

export default AdBannerListAddButton
