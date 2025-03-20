
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './components/provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { StrictMode } from 'react'
import { UserModal } from './components/modal/userModal.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
      <UserModal />
      <Toaster />
    </AppProvider>
  </StrictMode>


)
