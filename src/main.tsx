
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './components/provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { StrictMode } from 'react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
      <Toaster />
    </AppProvider>
  </StrictMode>


)
