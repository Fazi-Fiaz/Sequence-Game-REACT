import { maxPlayers, allplayerCards } from '../../../Constants';
import { CreateElement } from './CreateElement';
import { v4 } from 'uuid';

function PlayerHandCards(props) {
    let itemList = [];
    let cardarray = (array) => {
        allplayerCards.push(array);
        console.log("First Array", allplayerCards);
    }
    let playerFunc = () => {
        for (let play = 0; play < maxPlayers; play++) {
            let elem = <CreateElement id={play} shuffle={props.shuffle} key={v4()} setdata={cardarray} />;
            itemList.push(elem);
        }
    }
    playerFunc();
    return (
        <>
            {itemList}
        </>
    )
}
export default PlayerHandCards
