import Top from '@shared/Top'
import AdBanners from '@components/home/AdBanners'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님들을 위해 혜택 좋은 카드를 모아놨습니다."
      />
      <AdBanners />
    </div>
  )
}

export default HomePage
