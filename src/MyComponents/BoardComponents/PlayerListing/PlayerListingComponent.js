import React from 'react'
import { playerName, noOfTeams } from '../../../Constants';

function PlayerListingComponent({ id }) {
    let className = "players";
    if (noOfTeams > 0) {
        className += " half team" + (id % noOfTeams);
    }
    return (
        <div id={`player${id}`} className={className}>
            <div>{playerName[id]}</div>
            <img src={require(`../../../assets/cards/player.png`)} alt="Playing Players" />
        </div>
    )
}

export default PlayerListingComponent
