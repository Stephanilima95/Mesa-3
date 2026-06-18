import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/login/Login'
import Rotas from './routes/Rotas'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
      <Rotas />
    </>
  )
}

export default App
