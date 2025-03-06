
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './components/provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'


createRoot(document.getElementById('root')!).render(


  <AppProvider>
    <App />
    <Toaster />
  </AppProvider>

)
