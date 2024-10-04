import { useInfiniteQuery } from 'react-query'
import getCards from '@remote/card'
// import { flatten } from 'lodash'
import flatten from 'lodash.flatten'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

function CardList() {
  const {
    data,
    hasNextPage = false, //값이 없다면 false로 판단
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    // getNextPageParam의 return이 pageParam으로 들어옴
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      // getCards의 return data가 snapshot으로 들어옴
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching === true) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const navigate = useNavigate()

  if (data == null) {
    return null
  }
  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, idx) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts title={`${idx + 1}위`} subTitle={card.name} />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow={true}
                onClick={() => {
                  navigate(`card/${card.id}`)
                }}
              ></ListRow>
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
