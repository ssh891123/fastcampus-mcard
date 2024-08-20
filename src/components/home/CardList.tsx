import ListRow from '@shared/ListRow'

function CardList() {
  return (
    <ul>
      <ListRow
        left={<div>left</div>}
        contents={<ListRow.Texts title="title" subTitle="subTitle" />}
        right={<div>right</div>}
      ></ListRow>
    </ul>
  )
}

export default CardList
