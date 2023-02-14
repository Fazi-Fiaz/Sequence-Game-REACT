import Board from '../../components/BoardComponents/Board'
import PlayerCardListing from '../../components/PlayerCardListing'
// import PlayerListing from '../components/BoardComponents/PlayerListing/PlayerListing'
// import NoOfPlayingPlayers from '../components/BoardComponents/PlayerListing/NoOfPlayingPlayers'
import { teamColors, doubleDeck, singleEyeJacks } from '../../constants'
import { shuffle } from '../../helper'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';

function Sequence() {
  //   const [hasOpponent, setHasOpponent] = useState(false);
  // const [room, setRoom] = useState(paramsRoom);


  //   useEffect(() => {
  //     socket.on('playerTurn', (json) => {
  //       setTurnData(json);
  //     });

  //     socket.on('restart', () => {
  //       restart();
  //     });

  //     socket.on('opponent_joined', () => {
  //       setHasOpponent(true);
  //       setShare(false);
  //     });
  // }, []);

  const location = useLocation();
  const playerNames = location.state.playerName;
  let playerName = [
    playerNames,
    'Rafay',
    'Random',
    'Random2',
    'Random3'
  ]
  const noOfPlayers = location.state.noOfPlayers;
  const noOfTeams = location.state.noOfTeams;
  const [numberOfPlayers, setNumberOfPlayers] = useState(noOfPlayers)
  const [shuffledCards, setShuffledCards] = useState([])
  const [numberOfTeams, setNumberOfTeams] = useState(noOfTeams)
  const [numberOfCardPerPlayer, setNumberOfCardPerPlayer] = useState(4)
  const [totalSequenceCount, setTotalSequenceCount] = useState(2)
  const [playersInfo, setPlayersInfo] = useState([])
  const [activePlayer, setActivePlayer] = useState(0)
  const [enableSelectedBoardCard, setEnableSelectedBoardCard] = useState(null)
  const [cardPlacementHistory, setCardPlacementHistory] = useState([])

  // create inital card sets for players
  useEffect(() => {
    // Team Grouping
    let teamgroups = [];
    for (let i = 0; i < numberOfTeams; i++) {
      let innergroup = [];
      for (let x = 0; x < noOfPlayers; x++) {
        let playerdivision = x % numberOfTeams;
        if (playerdivision == i) {
          innergroup.push(playerName[x]);
        }
      }
      teamgroups.push(innergroup);
    }
    const allCardsShuffled = shuffle(doubleDeck)
    const players = []
    for (let i = 0; i < numberOfPlayers; i++) {
      let singlePlayerInfo = {
        name: playerName[i],
        teamColor: (numberOfTeams > 0 ? teamColors[i % numberOfTeams] : teamColors[i]),
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
        const alreadyInCards = playersInfo[activePlayer].cards.indexOf(cardClickId);
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
      }
    }
    setEnableSelectedBoardCard(cardClickId)
  }
  const winFunction = (elementObj, cardClickId) => {
    elementObj[cardClickId.id].sequence = 'lock'
    if (totalSequenceCount > 1 && playersInfo[activePlayer].combination != '1') {
      playersInfo[activePlayer].combination = '1'
      alert("First  Combination is  completed ");
    }
    else {
      alert("You Won")
    }
  }
  const winningCombinations = (cardClickId, elementObj) => {
    const cardHistory = Object.values(cardPlacementHistory)
    const cardHistoryColor = cardHistory.filter((data) => data.color === playersInfo[activePlayer].teamColor)
    const horizontalCombination = () => {
      let count = 0;
      let increment = 1;
      let decrement = 1;
      let checkedElement = [];
      cardHistoryColor.map((forward) => {
        if (!forward.hasOwnProperty('sequence') && (parseInt(forward.dataY) === (parseInt(elementObj[cardClickId.id].dataY) + increment)) &&
          (forward.dataX === elementObj[cardClickId.id].dataX)) {
          increment++;
          count++;
          checkedElement.push(forward);
        }
      })
      cardHistoryColor.reverse().map((prev) => {
        if (!prev.hasOwnProperty('sequence') && (parseInt(prev.dataY) === (parseInt(elementObj[cardClickId.id].dataY) - decrement)) &&
          (prev.dataX === elementObj[cardClickId.id].dataX)) {
          count++;
          decrement++;
          checkedElement.push(prev)
        }
      })
      if (count >= 2) {
        checkedElement.map((added) => added.sequence = 'lock');
        winFunction(elementObj, cardClickId)
      }
    }
    const verticalCombination = () => {
      let count = 0
      let increment = 1
      let decrement = 1
      let checkedElement = [];
      cardHistoryColor.reverse().map((forward) => {
        if (!forward.hasOwnProperty('sequence') && (parseInt(forward.dataX) === (parseInt(elementObj[cardClickId.id].dataX) + increment)) &&
          (forward.dataY === elementObj[cardClickId.id].dataY)) {
          increment++;
          count++;
          checkedElement.push(forward)
        }
      })
      cardHistoryColor.reverse().map((prev) => {
        if (!prev.hasOwnProperty('sequence') && (parseInt(prev.dataX) === (parseInt(elementObj[cardClickId.id].dataX) - decrement)) &&
          (prev.dataY === elementObj[cardClickId.id].dataY)) {
          count++;
          decrement++;
          checkedElement.push(prev)
        }
      })
      if (count >= 2) {
        checkedElement.map((added) => added.sequence = 'lock');
        winFunction(elementObj, cardClickId)
      }
    }

    const forwardDiagonalCombination = () => {
      let count = 0
      let increment = 1
      let decrement = 1
      let checkedElement = [];
      cardHistoryColor.reverse().map((forward) => {
        if (!forward.hasOwnProperty('sequence') && (parseInt(forward.dataX) === (parseInt(elementObj[cardClickId.id].dataX) + increment)) &&
          (parseInt(forward.dataY) === (parseInt(elementObj[cardClickId.id].dataY) + increment))) {
          increment++;
          count++;
          checkedElement.push(forward)
        }
      })
      cardHistoryColor.reverse().map((prev) => {
        if (!prev.hasOwnProperty('sequence') && (parseInt(prev.dataX) === (parseInt(elementObj[cardClickId.id].dataX) - decrement)) &&
          (parseInt(prev.dataY) === (parseInt(elementObj[cardClickId.id].dataY) - decrement))) {
          count++;
          decrement++;
          checkedElement.push(prev)
        }
      })
      if (count >= 2) {
        checkedElement.map((added) => added.sequence = 'lock');
        winFunction(elementObj, cardClickId)
      }
    }

    const backwardDiagonalCombination = () => {
      let count = 0
      let increment = 1
      let decrement = 1
      let checkedElement = [];
      cardHistoryColor.reverse().map((forward) => {
        if (!forward.hasOwnProperty('sequence') && (parseInt(forward.dataX) === (parseInt(elementObj[cardClickId.id].dataX) + increment)) &&
          (parseInt(forward.dataY) === (parseInt(elementObj[cardClickId.id].dataY) - increment))) {
          increment++;
          count++;
          checkedElement.push(forward)
        }
      })
      cardHistoryColor.reverse().map((prev) => {
        if (!prev.hasOwnProperty('sequence') && (parseInt(prev.dataX) === (parseInt(elementObj[cardClickId.id].dataX) - decrement)) &&
          (parseInt(prev.dataY) === (parseInt(elementObj[cardClickId.id].dataY) + decrement))) {
          count++;
          decrement++;
          checkedElement.push(prev)
        }
      })
      if (count >= 2) {
        checkedElement.map((added) => added.sequence = 'lock');
        winFunction(elementObj, cardClickId)
      }
    }

    horizontalCombination()
    verticalCombination()
    forwardDiagonalCombination()
    backwardDiagonalCombination()
  }
  const BoardClickCardId = e => {
    let elementObj = {};
    const cardClickId = e.currentTarget;
    // Single Eyed JACK Functionality
    if (singleEyeJacks.indexOf(enableSelectedBoardCard) > -1) {
      setCardPlacementHistory(current => {
        const copy = { ...current }
        delete copy[cardClickId.id];
        return copy;
      });
    } else {
      elementObj[cardClickId.id] = {
        color: playersInfo[activePlayer].teamColor,
        cardId: cardClickId.getAttribute('cardid'),
        dataX: cardClickId.getAttribute('data-x'),
        dataY: cardClickId.getAttribute('data-y')
      }
      // Winning Combinations
      winningCombinations(cardClickId, elementObj)
      // End Winning Combination
      setCardPlacementHistory({
        ...cardPlacementHistory,
        ...elementObj
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