import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import Top from '@shared/Top'
import { getCard } from '@remote/card'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'

function CardPage() {
  const { id = '' } = useParams()
  // card와 id를 묶어서 캐시 key값 생성
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', //id가 empty가 아닐때 fetch 해옴
  })

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data
  let subTitle =
    promotion != null ? removeHtml(promotion.title) : tags.join(' ,')
  console.log(subTitle)

  return (
    <>
      <Top title={`${name} ${corpName}`} subTitle={subTitle}></Top>
      <ul>
        {benefit.map((text, index) => {
          return (
            <ListRow
              key={text}
              left={<IconCheck />}
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          )
        })}
      </ul>
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </>
  )
}

function removeHtml(text: string) {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }

  return output
}

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}

export default CardPage
