import { maxPlayers } from '../../../Constants';
import { remainingshuffleDeck } from '../../../App';
import PlayerListingComponent from './PlayerListingComponent';
import { v4 } from 'uuid';

function PlayerListing() {
    let itemList = [];
    for (let play = 0; play < maxPlayers; play++) {
        let elements = <PlayerListingComponent id={play} key={v4()} />;
        itemList.push(elements);
    }
    console.log("Shuffled Cards", remainingshuffleDeck);
    return (
        <>
            {itemList}
        </>
    )
}

export default PlayerListing
