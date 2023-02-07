import Board from '../../components/BoardComponents/Board'
import PlayerCardListing from '../../components/PlayerCardListing'
// import PlayerListing from '../components/BoardComponents/PlayerListing/PlayerListing'
// import NoOfPlayingPlayers from '../components/BoardComponents/PlayerListing/NoOfPlayingPlayers'
import { teamColors, doubleDeck, singleEyeJacks } from '../../constants'
import { shuffle } from '../../helper'
import { useEffect } from 'react'
import { useState } from 'react'

// let shuffles = shuffle(doubleDeck)
function Sequence() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2)
  const [shuffledCards, setShuffledCards] = useState([])
  // const [numberOfTeams, setNumberOfTeams] = useState(2)
  const [numberOfCardPerPlayer, setNumberOfCardPerPlayer] = useState(4)
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
      allCardsShuffled.slice(numberOfCardPerPlayer * numberOfPlayers - allCardsShuffled.length)
    )
  }, [numberOfCardPerPlayer, numberOfPlayers])

  const playerSelectsCards = e => {

    const cardClickId = e.currentTarget.id;
    const cardValues = Object.values(cardPlacementHistory)
    const alreadyPlaced = cardValues.filter((c) => c.cardId === cardClickId).length
    if (alreadyPlaced > 1) {
      const shouldDiscard = window.confirm('Dead card found. Do you want to discard?')
      if (shouldDiscard) {
        const alreadyInCards = playersInfo[activePlayer].cards.indexOf(cardClickId)
        console.log("alreadyInCards", alreadyInCards)
        if (alreadyInCards > -1) {
          playersInfo[activePlayer].cards.splice(alreadyInCards, 1)
        }
        if (shuffledCards.length > 0) {
          const newCardForPlayer = shuffledCards.shift()
          playersInfo[activePlayer].cards.push(newCardForPlayer)
        }
        else {
          let playerTurn = activePlayer + (1 % numberOfPlayers)
          if (playerTurn >= numberOfPlayers) {
            playerTurn = 0
          }
          setActivePlayer(playerTurn)
        }
        setShuffledCards(shuffledCards)
        // setEnableSelectedBoardCard(null)
        // return
      }
    }
    setEnableSelectedBoardCard(cardClickId)
  }

  const BoardClickCardId = e => {
    // Single Eyed JACK Functionality
    if (singleEyeJacks.indexOf(enableSelectedBoardCard) > -1) {
      const cardClickId = e.currentTarget.id;
      setCardPlacementHistory(current => {
        const copy = { ...current }
        delete copy[cardClickId];
        return copy;
      });
    } else {
      let eleObj = {}
      eleObj[e.currentTarget.id] = {
        color: playersInfo[activePlayer].teamColor,
        cardId: e.currentTarget.getAttribute('cardid')
      }
      setCardPlacementHistory({
        ...cardPlacementHistory,
        ...eleObj
      })
    }
    let playerTurn = activePlayer + (1 % numberOfPlayers)
    if (playerTurn >= numberOfPlayers) {
      playerTurn = 0
    }
    // Assign Card From Deck
    const alreadyInCards = playersInfo[activePlayer].cards.indexOf(
      enableSelectedBoardCard
    )
    if (alreadyInCards > -1) {
      playersInfo[activePlayer].cards.splice(alreadyInCards, 1)
    }
    if (shuffledCards.length > 0) {
      const newCardForPlayer = shuffledCards.shift()
      playersInfo[activePlayer].cards.push(newCardForPlayer)
    }

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