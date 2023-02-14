import React from 'react'
import { playerName, noOfTeams, currentPlayer } from '../../../constants'

function PlayerListingComponent ({ id }) {
  let className = 'players'
  if (noOfTeams > 0) {
    className += ' half team' + (id % noOfTeams)
  }
  if (id == currentPlayer) {
    className += ' active'
  }
  return (
    <div id={`player${id}`} className={className}>
      <div>{playerName[id]}</div>
      <img
        src={require(`../../../assets/cards/player.png`)}
        alt='Playing Players'
      />
    </div>
  )
}

export default PlayerListingComponent
