import Sequence from './container/Sequence'
import JoinRoom from './container/JoinRoom'
import LandingScreen from './container/LandingScreen'
import { Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'
import './App.css'

const socket = socketIO('ws://localhost:3001')

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingScreen socket={socket} />} />
        <Route
          path='/join-room/:roomId'
          element={<JoinRoom socket={socket} />}
        />
        <Route path='/sequence' element={<Sequence socket={socket} />} />
      </Routes>
    </>
  )
}
export default App
