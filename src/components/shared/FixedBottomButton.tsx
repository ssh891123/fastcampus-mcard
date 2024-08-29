import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

import { colors } from '@styles/colorPalette'
import Button from '@shared/Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

function FixedBottomButton({ label, onClick }: FixedBottomButtonProps) {
  const $portal_root = document.getElementById('root_portal')
  if ($portal_root == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button full={true} onClick={onClick} css={buttonStyles} size="medium">
        {label}
      </Button>
    </Container>,
    $portal_root,
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
