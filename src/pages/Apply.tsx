import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Apply from '@components/apply'

import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@contexts/AlertContext'

//완성된 data를 실행하는 component
function ApplyPage() {
  const navigate = useNavigate()
  const user = useUser()
  const { id } = useParams() as { id: string }
  const { open } = useAlertContext()
  const [readyToPoll, setReadyToPoll] = useState(false)

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    option: {
      onSuccess: (value) => {
        // 처음 가입하는 경우
        if (value == null) {
          return
        }

        if (value.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        // 재심사가 필요한 경우 - polling 시도
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    // polling이 완료된 경우
    onSuccess: async () => {
      await updateApplyCard({
        cardId: id,
        userId: user?.uid as string,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
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

  if (data != null && data.status !== APPLY_STATUS.COMPLETE) {
    return <div>Data는 있지만, complete가 아닌 경우</div>
  }

  //TODO: 개선필요
  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading..</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
