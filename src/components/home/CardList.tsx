import { useInfiniteQuery } from 'react-query'
import getCards from '@remote/card'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'

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
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching === true) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }
  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
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
            ></ListRow>
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
