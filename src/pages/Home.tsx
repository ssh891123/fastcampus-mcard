import getCards from '@remote/card'
import getAdBanners from '@remote/adBanner'
import Top from '@shared/Top'
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    getCards().then((response) => {
      console.log('response-card', response)
    })
    getAdBanners().then((response) => {
      console.log('response-adbanner', response)
    })
  }, [])

  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님들을 위해 혜택 좋은 카드를 모아놨습니다."
      ></Top>
    </div>
  )
}

export default HomePage
