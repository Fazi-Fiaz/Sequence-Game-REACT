import Board from '../../components/BoardComponents/Board'
// import PlayerCards from '../components/BoardComponents/PlayerCards/PlayerCards'
// import PlayerListing from '../components/BoardComponents/PlayerListing/PlayerListing'
// import NoOfPlayingPlayers from '../components/BoardComponents/PlayerListing/NoOfPlayingPlayers'
import { teamColors, doubleDeck } from '../../constants'
import { shuffle } from '../../helper'
import { useEffect } from 'react'
import { useState } from 'react'

// let shuffles = shuffle(doubleDeck)
function Sequence () {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2)
  // const [numberOfTeams, setNumberOfTeams] = useState(2)
  const [numberOfCardPerPerson, setNumberOfCardPerPerson] = useState(7)
  const [totalSequenceCount, setTotalSequenceCount] = useState(2)
  const [playersInfo, setPlayersInfo] = useState([])
  const [shuffledCards, setShuffledCards] = useState(shuffle(doubleDeck))

  // create inital card sets for players
  useEffect(() => {
    const players = []
    for (let i = 0; i < numberOfPlayers; i++) {
      let singlePlayerInfo = {
        name: 'Player:' + (i + 1),
        teamColor: teamColors[i],
        cards: shuffledCards.slice(
          i * numberOfCardPerPerson,
          (i + 1) * numberOfCardPerPerson
        ),
        cardsHistory: ''
      }
      players.push(singlePlayerInfo)
    }
    setPlayersInfo(players)
  }, [numberOfCardPerPerson, numberOfPlayers, shuffledCards])

  return <>{playersInfo && <Board />}</>
}
// const mappingFunction = id => {
//   let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${id}]`)
//   let count = 0
//   let playerlist = document.querySelectorAll('.players')
//   playerlist.forEach(played => {
//     played.classList.remove('active')
//     let activeplayer = document.getElementById(`player${currentPlayer}`)
//     activeplayer.classList.add('active')
//   })
//   boardCardCheck.forEach(selectedBoardCard => {
//     if (selectedBoardCard.classList.contains('xhr') == false) {
//       // Enabling Board Cards according to Handed Cards
//       // selectedBoardCard.classList.add('enable');
//     }
//     // For Dead Cards
//     else {
//       count++
//     }
//     let handcard = document.querySelector(`#user${currentPlayer} #${id}`)
//     if (count > 0) {
//       if (handcard.classList.contains('dead')) {
//         handcard.classList.remove('dead')
//         handcard.removeChild(handcard.children[2])
//         handcard.removeChild(handcard.children[1])
//       }
//     }
//     if (count >= 2) {
//       handcard.classList.add('dead')
//       let div = document.createElement('div')
//       let divs = document.createElement('div')
//       divs.setAttribute('class', 'deadcard-icon')
//       div.setAttribute('class', 'deadcard')
//       div.innerHTML = 'Dead Card'
//       handcard.appendChild(divs)
//       handcard.appendChild(div)
//     }
//   })
// }
// const disableBoardCards = () => {
//   let removeClass = document.querySelectorAll('#board-cards li')
//   removeClass.forEach(removes => {
//     removes.classList.remove('enable')
//   })
// }
// // Disable all Users Cards and Enable Active user
// function disableUsers () {
//   let disables = document.querySelectorAll('.positions')
//   disables.forEach(disablesall => {
//     disablesall.classList.add('disable-user')
//   })
//   document
//     .getElementById(`positions${currentPlayer}`)
//     .classList.remove('disable-user')
// }
// const BoardClickCardId = e => {
//   let cardinfo = e.currentTarget
//   let cardid = cardinfo.getAttribute('card')
//   let enableCards = document.querySelectorAll('#board-cards .enable')
//   let enableCardsRemove = document.querySelectorAll('#board-cards li')
//   enableCards.forEach(enables => {
//     enables.classList.remove('enable')
//   })

//   // For Single Eyed Jack Cards
//   if (cardid == 'JS' || cardid == 'JH') {
//     cardinfo.classList.remove(color[0], color[1], color[2], 'xhr')
//     cardinfo.removeAttribute('color', player.color)
//     enableCardsRemove.forEach(adding => {
//       let a = adding.hasAttribute('color')
//       if (a === true) {
//         adding.classList.add('xhr')
//       }
//     })
//   } else {
//     cardinfo.classList.add(player.color, 'xhr')
//     cardinfo.setAttribute('color', player.color)
//   }
//   pushCard(cardinfo, cardid)
// }

// const PlayerClickCardId = e => {
//   Object.assign(player, { cards: allPlayerCards[currentPlayer] })
//   let id = e.currentTarget.id
//   disableUsers()
//   disableBoardCards()
//   mappingFunction(id)
//   enableBoardCards(id)
// }

export default Sequence
