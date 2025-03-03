import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(

  <HeroUIProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>,
    </BrowserRouter>

  </HeroUIProvider>

)
