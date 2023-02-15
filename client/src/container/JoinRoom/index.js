import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocation, useParams } from 'react-router-dom'
import StartButton from '../../components/LandingComponent/StartButton'
import TextInputField from '../../components/LandingComponent/TextInputField'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

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
    <div className='join-room container'>
      {!isAuthor && (
        <>
          <TextInputField
            handlePlayerName={handlePlayerName}
            playerName={playerName}
          />
          <StartButton submitValues={submitValues} />
        </>
      )}
      <h2 className='margin-bottom'>Number of Players: </h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>NAME</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users &&
            users.map((e, i) => {
              return (
                <tr>
                  <th scope='row' key={i}>{i + 1}</th>
                  <td>{e}</td>
                </tr>
              )
            })
          }
        </MDBTableBody>
      </MDBTable>
    </div>
  )
}

export default JoinRoom
