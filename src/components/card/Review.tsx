import { useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true, //최초 한번만 동작하도록
  })

  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요 !!'])
        }, 2_000)
      })
    },
    { enabled: inView },
  )

  // ref값이 변경됐을때, inView값이 변경하게 됨
  console.log('inView', inView)

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map(() => <div>리뷰입니다. 웃으면 복이 올거예요</div>)
      )}
    </div>
  )
}

export default Review
