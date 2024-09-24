import Apply from '@components/apply'
import { ApplyValues } from '@models/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'

//완성된 data를 실행하는 component
function ApplyPage() {
  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드 추가!!!')
      //값이 추가되었을때 => 폴링 시작
    },
    onError: () => {
      //실패했을때 => 폴링 시작
      window.history.back()
    },
  })

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
