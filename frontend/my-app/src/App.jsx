import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginReg from './Components/loginreg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginReg />
    </>
  )
}

export default App
