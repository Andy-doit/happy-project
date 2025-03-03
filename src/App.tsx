
import './App.css'
import { Button } from '@heroui/react'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      {routeElements}
    </>
  )
}

export default App

