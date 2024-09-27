import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Apply from '@components/apply'

import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'

//완성된 data를 실행하는 component
function ApplyPage() {
  const navigate = useNavigate()
  const user = useUser()
  const { id } = useParams() as { id: string }
  const [readyToPoll, setReadyToPoll] = useState(false)

  usePollApplyStatus({
    onSuccess: async () => {
      console.log('성공')
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      setReadyToPoll(false)
      navigate('/apply/done?success=true', {
        replace: true,
      })
    },
    onError: async () => {
      console.log('실패')
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', {
        replace: true,
      })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드 추가!!!')
      setReadyToPoll(true)
      //값이 추가되었을때 => 폴링 시작
    },
    onError: () => {
      //실패했을때 => 폴링 시작
      window.history.back()
    },
  })

  //TODO: 개선필요
  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading..</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
