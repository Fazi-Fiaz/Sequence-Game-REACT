import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import StartButton from '../../components/LandingComponent/StartButton'
import TextInputField from '../../components/LandingComponent/TextInputField'

const JoinRoom = ({ socket }) => {
  const { roomId } = useParams()
  const [playerName, setPlayerName] = useState('')
  const [users, setUsers] = useState([])
  const location = useLocation()
  const isAuthor = location.state?.isAuthor

  const handlePlayerName = e => {
    setPlayerName(e.target.value)
  }

  const submitValues = () => {
    socket.emit('joinRoom', {
      roomId: roomId,
      user: {
        name: playerName
      },
      socketID: socket.id
    })
  }

  socket.on('user-update', data => {
    console.log('herere', data)
    setUsers(data.users)
  })

  return (
    <div className='container'>
      {!isAuthor && (
        <>
          <TextInputField
            handlePlayerName={handlePlayerName}
            playerName={playerName}
          />
          <StartButton submitValues={submitValues} />
        </>
      )}

      {users &&
        users.map((e, i) => {
          return <span key={i}>{e}</span>
        })}
    </div>
  )
}

export default JoinRoom
