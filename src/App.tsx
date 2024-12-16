import { css } from '@emotion/react'
import styled from '@emotion/styled'
import './App.css'

const bold = css`
  font-weight: bold;
`

const contianerStyles = css`
  background-color: black;
  ${bold}
`

const Button = styled.button`
  width: 200px;
  height: 100px;
  ${bold}
`

function App() {
  return (
    <div className="App" css={contianerStyles}>
      <Button>스타일 버튼</Button>
    </div>
  )
}

export default App
