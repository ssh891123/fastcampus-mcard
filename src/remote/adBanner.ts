import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { AdBanner } from '@models/card'

async function getAdBanners() {
  // getDocs로 banner의 전체 data를 가져옴
  const adBannerSnapShot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )

  // data를 가공하여 필요한 data만 반환
  return adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}

export default getAdBanners
