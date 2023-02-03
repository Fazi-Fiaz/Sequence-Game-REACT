import { maxPlayers, allPlayerCards } from '../../../constants';
import { PlayerCardListing } from './PlayerCardListing';
import { v4 } from 'uuid';
import { useCallback } from 'react';
import { useState } from 'react';
import Mapping from './Mapping';

function PlayerCards({ PlayerClickCardId, shuffle }) {
    // const [useMapId, setUseMapId] = useState(null);

    let itemList = [];
    let playerFunction = useCallback(() => {
        let cardArray = (array) => {
            allPlayerCards.push(array);
        }
        for (let play = 0; play < maxPlayers; play++) {
            let elem = <PlayerCardListing
                id={play}
                shuffle={shuffle} key={v4()}
                setData={cardArray}
                PlayerClickCardId={PlayerClickCardId}
            />;
            itemList.push(elem);
        }
    }, [])
    playerFunction();
    return (
        <>
            {itemList}
            {/* <Mapping id={useMapId} /> */}
        </>
    )
}
export default PlayerCards
