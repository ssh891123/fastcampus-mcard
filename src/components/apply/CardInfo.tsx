import { MouseEvent, useCallback, useState } from 'react'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import FixedBottomButton from '@shared/FixedBottomButton'
import { ApplyValues } from '@models/apply'

type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>

function CardInfo({ onNext }: { onNext: (values: CardInfoValues) => void }) {
  const [cardInfoValue, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isHipass: false,
    isRf: false,
  })

  const { isMaster, isHipass, isRf } = cardInfoValue

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setCardInfoValues((prev) => ({
      ...prev,
      // data-set이 string이 넘어오므로 type 변환 필요
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Button.ButtonGroup title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.ButtonGroup>

      <Spacing size={12} />

      <Button.ButtonGroup title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.ButtonGroup>

      <Spacing size={12} />

      <Button.ButtonGroup title="후불하이패스">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.ButtonGroup>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValue)
        }}
      />
    </div>
  )
}

export default CardInfo
