import './App.css'
import Text from '@common/Text'
import Button from '@common/Button'

function App() {
  return (
    <div className="App">
      <Button>스타일 버튼</Button>
      <Text>???</Text>
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
    </div>
  )
}

export default App
