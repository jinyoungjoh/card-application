import Text from '@common/Text'
import Button from '@common/Button'
import Input from '@common/Input'
import TextField from '@common/TextField'
import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <div className="App">
      <Text>안녕하세요</Text>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak>
        클릭해주세요
      </Button>
      <Button color="error" weak>
        클릭해주세요
      </Button>
      <Button full>클릭해주세요</Button>
      <Button full disabled>
        클릭해주세요
      </Button>
      <Input placeholder="아이디"></Input>
      <Input placeholder="패스워드" aria-invalid={true}></Input>
      <TextField label={'아이디'} />
      <TextField label={'패스워드'} />

      <Button
        onClick={() => {
          open({
            title: '카드신청완료',
            description: '내역페이지에서 확인해주세요',
            onButtonClick: () => {},
          })
        }}
      >
        Alert 오픈
      </Button>
    </div>
  )
}

export default App
