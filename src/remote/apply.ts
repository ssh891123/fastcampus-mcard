import { ApplyValues } from '@/models/apply'
import { COLLECTIONS } from '@constants'
import { addDoc, collection } from 'firebase/firestore'
import { store } from './firebase'

async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export default applyCard
