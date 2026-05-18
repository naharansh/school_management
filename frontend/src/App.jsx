import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App_Routes } from './routes/routes/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>     
     <BrowserRouter>
        <Routes>
          <Route path='/*' element={< App_Routes/>}/>
          {/* <Route path='/admin/*' element={}/> */}
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
