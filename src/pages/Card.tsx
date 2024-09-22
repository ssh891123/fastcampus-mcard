import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import Top from '@shared/Top'
import { getCard } from '@remote/card'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

import { useAlertContext } from '@contexts/AlertContext'
import useUser from '@hooks/auth/useUser'

function CardPage() {
  const { id = '' } = useParams()
  const user = useUser()
  // card와 id를 묶어서 캐시 key값 생성
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', //id가 empty가 아닐때 fetch 해옴
  })

  const { open } = useAlertContext()
  const navigate = useNavigate()

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다',
        onButtonClick: () => {
          // 로그인 이후에 원래 페이지로 돌아가기 위한 state 전달
          navigate('/signin', { state: id })
        },
      })
    }

    navigate(`/apply/${id}`)
  }, [user, id, open, navigate])

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data
  let subTitle =
    promotion != null ? removeHtml(promotion.title) : tags.join(' ,')

  return (
    <>
      <Top title={`${name} ${corpName}`} subTitle={subTitle}></Top>
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              // 화면에 보여질때(예: 스크롤 이벤트) animation 적용 옵션
              // whileInView={{
              //   opacity: 1,
              //   translateX: 0,
              // }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{ opacity: 1, translateX: 0 }}
            >
              <ListRow
                as="div"
                key={text}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termContainerStyles}>
          <Text bold={true} typography="t4">
            유의사항
          </Text>
          <Text typography="t7">{removeHtml(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={moveToApply} />
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

const termContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage
