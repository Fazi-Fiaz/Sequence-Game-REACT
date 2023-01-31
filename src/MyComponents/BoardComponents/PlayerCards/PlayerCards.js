import { maxPlayers, allPlayerCards, doubleDeck } from '../../../Constants';
import { PlayerCardListing } from './PlayerCardListing';
import { v4 } from 'uuid';
import { useCallback } from 'react';
import { shuffle } from '../../../Helper';
import { useState } from 'react';
import Mapping from './Mapping';

function PlayerCards() {
    const [useMapId, setUseMapId] = useState(null);
    let itemList = [];
    let playerFunction = useCallback(() => {
        let cardArray = (array) => {
            allPlayerCards.push(array);
            console.log("First Array", allPlayerCards);
        }
        for (let play = 0; play < maxPlayers; play++) {
            let elem = <PlayerCardListing id={play} shuffle={shuffle(doubleDeck)} key={v4()} setData={cardArray} setUseMapId={setUseMapId} />;
            itemList.push(elem);
        }
    }, [])
    playerFunction();
    return (
        <>
            {itemList}
            <Mapping id={useMapId} />
        </>
    )
}
export default PlayerCards
