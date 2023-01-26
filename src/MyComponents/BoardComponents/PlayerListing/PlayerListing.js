import { maxPlayers } from '../../../Constants';
import PlayerListingComponent from './PlayerListingComponent';
import { v4 } from 'uuid';

function PlayerListing() {
    let itemList = [];
    for (let play = 0; play < maxPlayers; play++) {
        let elements = <PlayerListingComponent id={play} key={v4()} />;
        itemList.push(elements);
    }
    return (
        <>
            {itemList}
        </>
    )
}

export default PlayerListing
