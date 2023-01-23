import React from 'react'
import { playerName } from '../../../Constants';

function PlayerListingComponent({ id }) {
    return (
        <div id={`player${id}`} className="players">
            <div>{playerName[id]}</div>
            <img src={require(`../../../assets/cards/player.png`)} />
        </div>
    )
}

export default PlayerListingComponent
