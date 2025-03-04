import { Toaster } from "@/components/ui/sonner"
import './App.css'

import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>

      {routeElements}
      <Toaster />
    </>
  )
}

export default App

