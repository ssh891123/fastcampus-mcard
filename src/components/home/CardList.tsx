import ListRow from '@shared/ListRow'
import { useQuery } from 'react-query'
import getCards from '@remote/card'

function CardList() {
  const { data } = useQuery('cards', () => getCards())
  if (data == null) {
    return null
  }

  return (
    <ul>
      {data.map((card, idx) => {
        return (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${idx + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <div>{card.payback}</div> : null}
            withArrow={true}
          ></ListRow>
        )
      })}
    </ul>
  )
}

export default CardList
