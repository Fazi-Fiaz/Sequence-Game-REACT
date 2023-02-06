import Board from '../../components/BoardComponents/Board'
import PlayerCardListing from '../../components/PlayerCardListing'
// import PlayerListing from '../components/BoardComponents/PlayerListing/PlayerListing'
// import NoOfPlayingPlayers from '../components/BoardComponents/PlayerListing/NoOfPlayingPlayers'
import { teamColors, doubleDeck } from '../../constants'
import { shuffle } from '../../helper'
import { useEffect } from 'react'
import { useState } from 'react'

// let shuffles = shuffle(doubleDeck)
function Sequence () {
  const [numberOfPlayers, setNumberOfPlayers] = useState(1)
  const [shuffledCards, setShuffledCards] = useState([])
  // const [numberOfTeams, setNumberOfTeams] = useState(2)
  const [numberOfCardPerPlayer, setNumberOfCardPerPlayer] = useState(7)
  const [totalSequenceCount, setTotalSequenceCount] = useState(2)
  const [playersInfo, setPlayersInfo] = useState([])
  const [activePlayer, setActivePlayer] = useState(0)
  const [enableSelectedBoardCard, setEnableSelectedBoardCard] = useState(null)
  const [cardPlacementHistory, setCardPlacementHistory] = useState([])

  // create inital card sets for players
  useEffect(() => {
    const allCardsShuffled = shuffle(doubleDeck)
    const players = []
    for (let i = 0; i < numberOfPlayers; i++) {
      let singlePlayerInfo = {
        name: 'Player:' + (i + 1),
        teamColor: teamColors[i],
        cards: allCardsShuffled.slice(
          i * numberOfCardPerPlayer,
          (i + 1) * numberOfCardPerPlayer
        )
      }
      players.push(singlePlayerInfo)
    }
    setPlayersInfo(players)

    setShuffledCards(
      allCardsShuffled.slice(
        numberOfCardPerPlayer * numberOfPlayers - allCardsShuffled.length
      )
    )
  }, [numberOfCardPerPlayer, numberOfPlayers])

  const playerSelectsCards = e => {
    let id = e.currentTarget.id
    setEnableSelectedBoardCard(id)
  }

  const BoardClickCardId = e => {
    let eleObj = {}
    eleObj[e.currentTarget.id] = playersInfo[activePlayer].teamColor
    setCardPlacementHistory({
      ...cardPlacementHistory,
      ...eleObj
    })

    let playerTurn = activePlayer + (1 % numberOfPlayers)
    if (playerTurn >= numberOfPlayers) {
      playerTurn = 0
    }
    const newCardForPlayer = shuffledCards.shift()
    const alreadyInCards = playersInfo[activePlayer].cards.indexOf(
      enableSelectedBoardCard
    )
    if (alreadyInCards > -1) {
      playersInfo[activePlayer].cards.splice(alreadyInCards, 1)
    }
    playersInfo[activePlayer].cards.push(newCardForPlayer)

    setActivePlayer(playerTurn)
    setShuffledCards(shuffledCards)
    setEnableSelectedBoardCard(null)
  }

  return (
    <div id='dashboard'>
      {/* <!-- PlayerCards --> */}
      <div id='playerCards'>
        {playersInfo && (
          <PlayerCardListing
            activePlayer={playersInfo[activePlayer]}
            playerSelectsCards={playerSelectsCards}
          />
        )}
      </div>
      {/* <!-- EndPlayerCards --> */}
      {playersInfo && (
        <Board
          enableSelectedBoardCard={enableSelectedBoardCard}
          BoardClickCardId={BoardClickCardId}
          cardPlacementHistory={cardPlacementHistory}
        />
      )}
    </div>
  )
}

export default Sequence
