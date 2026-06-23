import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsuarioProvider } from './context/UsuarioProvider.jsx'
import { TemaProvider } from './context/TemaProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvider>
      <UsuarioProvider>
        <App />
      </UsuarioProvider>
    </TemaProvider>
  </StrictMode>,
)