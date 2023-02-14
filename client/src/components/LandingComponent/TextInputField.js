import React from 'react'

export default function TextInputField({ handlePlayerName, playerName }) {
    return (
        <div className="drop-down cus-width-input">
            <input
                type="text"
                className="form-control"
                id="playerName"
                value={playerName}
                onChange={handlePlayerName}
                placeholder="Enter Player Name"
            />
        </div>
    );
}
