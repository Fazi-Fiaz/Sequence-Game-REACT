import { playerName, maxPlayerCards } from '../../../constants'
import Mapping from './Mapping'
import { CreateCardsList } from '../CreateCardsList'
import { v4 } from 'uuid'
// import { useRef } from 'react';

export const PlayerCardListing = ({
  shuffle,
  id,
  setData,
  PlayerClickCardId
}) => {
  let singlePlayerCard = []
  let itemList = []
  for (let i = 0; i < maxPlayerCards; i++) {
    let elem = (
      <CreateCardsList
        className='handcard'
        id={shuffle[0]}
        srcimg={require(`../../../assets/cards/${shuffle[0]}.png`)}
        PlayerClickCardId={PlayerClickCardId}
        key={v4()}
      />
    )
    singlePlayerCard.push(shuffle[0])
    shuffle.shift()
    itemList.push(elem)
  }
  setData(singlePlayerCard)
  return (
    <div className='positions' id={`positions${id}`}>
      <div>{playerName[id]}</div>
      <div className='hand-cards'>
        <ul id={`user${id}`}>{itemList}</ul>
      </div>
    </div>
  )
}
