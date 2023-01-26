import { maxPlayers, allPlayerCards, doubleDeck } from '../../../Constants';
import { PlayerCardListing } from './PlayerCardListing';
import { v4 } from 'uuid';
import { useCallback } from 'react';
import { shuffle } from '../../../helper';

function PlayerCards(props) {
    let itemList = [];
    let playerFunction = useCallback(() => {
        let cardArray = (array) => {
            allPlayerCards.push(array);
            console.log("First Array", allPlayerCards);
        }
        for (let play = 0; play < maxPlayers; play++) {
            let elem = <PlayerCardListing id={play} shuffle={shuffle(doubleDeck)} key={v4()} setdata={cardArray} />;
            itemList.push(elem);
        }
    }, [])
    playerFunction();
    return (
        <>
            {itemList}
        </>
    )
}
export default PlayerCards
