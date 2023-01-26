import Board from './MyComponents/BoardComponents/Board';
import PlayerCards from './MyComponents/BoardComponents/PlayerCards/PlayerCards';
import PlayerListing from './MyComponents/BoardComponents/PlayerListing/PlayerListing';
import NoOfPlayingPlayers from './MyComponents/BoardComponents/PlayerListing/NoOfPlayingPlayers';
import { allPlayerCards } from './Constants';

import './App.css';

function App() {
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
          <img id="disID" src={require('./assets/cards/jokar.png')} alt="Discards Cards" />
        </div>
      </div>
      {/* <!-- End DisCard Cards --> */}

      {/* <!-- Remaining Deck --> */}
      <div className="remianing-deck">
        <div className="placements">
          <img id="disID" src={require('./assets/cards/card.jpeg')} alt="" />
        </div>
      </div>
      {/* <!-- End Remaining Deck --> */}
    </div>
  );
}
console.log("Players Cards", allPlayerCards)
export default App;
