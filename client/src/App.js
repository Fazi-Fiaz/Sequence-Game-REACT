import Sequence from './container/Sequence'
import LandingScreen from './container/LandingScreen'
import { Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import './App.css'

const socket = io("localhost:3001/");
console.log("Socket", socket);


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path='/Sequence' element={<Sequence />} />
      </Routes>
    </>
  )
}
export default App
