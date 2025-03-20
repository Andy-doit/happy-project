

import { RouterProvider } from "react-router-dom"
import { router } from "./routes/route"
function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

