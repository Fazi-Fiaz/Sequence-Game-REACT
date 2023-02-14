import { CreateCardsList } from '../CreateCardsList'

function PlayerCardListing ({ activePlayer, playerSelectsCards }) {
  if (!activePlayer) {
    return null
  }
  return (
    <div className='positions'>
      <div>{activePlayer.name}</div>
      <div className='hand-cards'>
        <ul>
          {activePlayer.cards.map((ele, index) => {
            return (
              <CreateCardsList
                className='handcard'
                id={ele}
                srcimg={require(`../../assets/cards/${ele}.png`)}
                PlayerClickCardId={playerSelectsCards}
                key={index}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default PlayerCardListing
