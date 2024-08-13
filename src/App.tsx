import React from 'react'
import './App.css'

import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import Alert from '@shared/Alert'

function App() {
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" color="green">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text typography="t5">t5</Text>
      <Text typography="t6">t6</Text>
      <Text typography="t7">t7</Text>

      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <Button color="success"> 클릭해주세요 </Button>
      <Button color="error"> 클릭해주세요 </Button>
      <Button color="success" weak>
        클릭해주세요
      </Button>
      <Button full> 클릭해주세요 </Button>
      <Button disabled> 클릭해주세요 </Button>

      <Input placeholder="로그인" aria-invalid={false} />
      <Input aria-invalid={true} />

      <TextField label="아이디" />
      <TextField label="패스워드" hasError={true} />

      <Alert
        open={true}
        description="안녕하세요"
        title="알랏이 떳습니다"
        onButtonClick={() => {}}
      />
    </div>
  )
}

export default App
