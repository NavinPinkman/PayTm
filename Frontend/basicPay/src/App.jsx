import './App.css';
import './index.css'

import{BrowserRouter , Routes, Route} from "react-router-dom"

import { Signup } from './pages/signup';
import { Signin } from './pages/singin';
import{ Dashboard} from './pages/dashboard'
import { Sendmoney} from './pages/sendmoney'


function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/send' element={<Sendmoney/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
