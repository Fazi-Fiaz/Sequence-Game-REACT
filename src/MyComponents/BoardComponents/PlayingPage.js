import Board from './Board';
import PlayerCards from './PlayerCards/PlayerCards';
import PlayerListing from './PlayerListing/PlayerListing';
import NoOfPlayingPlayers from './PlayerListing/NoOfPlayingPlayers';

import '../../App.css';

function PlayingPage() {
    return (
        <div id="dashboard">
            {/* <!-- PlayerCards --> */}
            <div id="playerCards">
                <PlayerCards />
            </div>
            {/* <!-- EndPlayerCards --> */}

            {/* <!-- Main Board --> */}
            <Board />
            {/* <!-- End Main Board --> */}

            {/* <!-- Players --> */}
            <div id="no-of-player">
                <NoOfPlayingPlayers />
                <div id="displayPlayer">
                    <PlayerListing />
                </div>
            </div>
            {/* <!-- End Players --> */}

            {/* <!-- DisCard Cards --> */}
            <div className="discardCards">
                <div className="placements">
                    <img id="disID" src={require('../../assets/cards/jokar.png')} alt="Discards Cards" />
                </div>
            </div>
            {/* <!-- End DisCard Cards --> */}

            {/* <!-- Remaining Deck --> */}
            <div className="remianing-deck">
                <div className="placements">
                    <img id="disID" src={require('../../assets/cards/card.jpeg')} alt="" />
                </div>
            </div>
            {/* <!-- End Remaining Deck --> */}
        </div>
    );
}

export default PlayingPage;
