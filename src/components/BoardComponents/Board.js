import { CreateCardsList } from '../CreateCardsList'
import { v4 } from 'uuid'
import { boardDeck } from '../../constants'
import { useEffect, useState } from 'react'

const Board = ({ enableSelectedBoardCard, cardPlacementHistory, BoardClickCardId }) => {
    const [boardCards, setBoardCards] = useState([])
    useEffect(() => {
        let itemList = []
        let concat = 0
        let liValue
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (
                    (x === 0 && y === 0) ||
                    (x === 9 && y === 0) ||
                    (x === 0 && y === 9) ||
                    (x === 9 && y === 9)
                ) {
                    liValue = {
                        class: 'disabledelement empty-img',
                        id: '',
                        cardId: '',
                        srcimg: require(`../../assets/cards/giga${x}${y}.png`),
                        key: v4()
                    }
                } else {
                    liValue = {
                        class: "disabledelement ",
                        dataX: x,
                        dataY: y,
                        id: concat,
                        cardId: boardDeck[concat],
                        // PlayerClickCardId: BoardClickCardId,
                        srcimg: require(`../../assets/cards/${boardDeck[concat]}.png`),
                        key: v4()
                    }
                    concat++
                }
                itemList.push(liValue)
            }
        }
        setBoardCards(itemList)
    }, [setBoardCards])

    return (
        <ul id='board-cards'>{boardCards && boardCards.map((ele) =>
            <CreateCardsList
                className={ele.class + (cardPlacementHistory[ele.id] ? cardPlacementHistory[ele.id] : '') +
                    (!ele.color && enableSelectedBoardCard === ele?.cardId ? ' enable' : '')}
                color={cardPlacementHistory[ele.id] ? cardPlacementHistory[ele.id] : ''}
                dataX={ele.dataX}
                dataY={ele.dataY}
                id={ele.id}
                cardId={ele.cardId}
                srcimg={ele.srcimg}
                key={v4()}
                PlayerClickCardId={BoardClickCardId}
            />
        )}</ul>
    )
}

export default Board