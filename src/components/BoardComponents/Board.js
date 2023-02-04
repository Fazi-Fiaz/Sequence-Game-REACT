import { CreateCardsList } from '../CreateCardsList'
import { v4 } from 'uuid'
import { boardDeck } from '../../constants'

const Board = ({ BoardClickCardId }) => {
  let itemList = []
  let showBoardCards = () => {
    let concat = 0
    let liValue
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (
          (x == 0 && y == 0) ||
          (x == 9 && y == 0) ||
          (x == 0 && y == 9) ||
          (x == 9 && y == 9)
        ) {
          let emptyDiv = 'empty-img'
          liValue = (
            <CreateCardsList
              className='disabledelement'
              dataX={x}
              dataY={y}
              emptyDiv={emptyDiv}
              srcimg={require(`../../assets/cards/giga${x}${y}.png`)}
              key={v4()}
            />
          )
        } else {
          liValue = (
            <CreateCardsList
              className='disabledelement'
              dataX={x}
              dataY={y}
              id={concat}
              cardId={boardDeck[concat]}
              PlayerClickCardId={BoardClickCardId}
              srcimg={require(`../../assets/cards/${boardDeck[concat]}.png`)}
              key={v4()}
            />
          )
          concat++
        }
        itemList.push(liValue)
      }
    }
  }
  showBoardCards()
  return <ul id='board-cards'>{itemList}</ul>
}

export default Board
