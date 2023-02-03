import Board from './Board';
import PlayerCards from './PlayerCards/PlayerCards';
import PlayerListing from './PlayerListing/PlayerListing';
import NoOfPlayingPlayers from './PlayerListing/NoOfPlayingPlayers';
import { currentPlayer, player, color, discardCards, allPlayerCards, doubleDeck, noOfTurns, noOfTeams, currentTeam, maxPlayers, playerName } from '../../constants';
import { shuffle } from '../../helper';
import StaticCards from './StaticCards';
import Mapping from './PlayerCards/Mapping';
import { useState } from 'react';

import '../../App.css';
let shuffles = shuffle(doubleDeck)
function PlayingPage() {
    // const [useMapId, setUseMapId] = useState(null);
    return (
        <div id="dashboard">

            {/* PlayerCards */}
            <div id="playerCards">
                <PlayerCards PlayerClickCardId={PlayerClickCardId} shuffle={shuffles} />
                {/* <Mapping id={useMapId} /> */}
            </div>

            {/* Main Board */}
            <Board BoardClickCardId={BoardClickCardId} />

            {/* Players */}
            <div id="no-of-player">
                <NoOfPlayingPlayers />
                <div id="displayPlayer">
                    <PlayerListing />
                </div>
            </div>

            {/* Static Bottom Cards */}
            <StaticCards />

        </div>
    );
}

// Switch Players
const switchPlayers = () => {
    noOfTurns = noOfTurns + 1;
    currentPlayer = (noOfTurns % maxPlayers);
    console.log("Player Turn", currentPlayer);
    currentTeam = currentPlayer % noOfTeams;
    if (noOfTeams > 0) {
        player = {
            turn: true,
            color: color[currentTeam],
            cards: allPlayerCards[currentPlayer],
            playerName: playerName[currentPlayer]
        }
    }
    else {
        player = {
            turn: true,
            color: color[currentPlayer],
            cards: allPlayerCards[currentPlayer],
            playerName: playerName[currentPlayer]
        }
    }
}
// Reassign Hand Cards 
const reassignPlayerCards = (cardid) => {
    let remaininghandcard = document.querySelectorAll(`#user${currentPlayer} li`);
    let count = 0;
    remaininghandcard.forEach(remaing => {
        if (count == 0) {  //For Avoiding Remove Double Same ID Card from Hand Cards
            let remaingid = remaing.getAttribute("id");
            if (cardid == remaingid) {
                let user = document.getElementById(`user${currentPlayer}`);
                remaing.remove();
                if (shuffles.length > 0) {
                    let li = document.createElement("li");
                    li.setAttribute('id', shuffles[0]);
                    li.setAttribute('class', 'handcard');
                    let img = document.createElement("img");
                    img.setAttribute('src', require(`../../assets/cards/${shuffles[0]}.png`));
                    player.cards.push(shuffles[0]);
                    shuffles.shift();
                    li.appendChild(img);
                    user.appendChild(li);
                }
                count++;
            }
        }
    });
}

// Discards Cards Function
const discardCardsFunc = function () {
    let diss = discardCards[0];
    document.getElementById('disID').setAttribute("src", require(`../../assets/cards/${diss}.png`));
}

// Discard Cards
const pushCard = (cardinfo, cardid) => {
    for (let i = 0; i <= player.cards.length - 1; i++) {
        if (player.cards[i] == cardid) {
            discardCards.unshift(player.cards[i]);
            player.cards.splice(i, 1);
            reassignPlayerCards(cardid);
            break;
        }
    }
    // winningCombination(cardinfo);
    discardCardsFunc();
    // switchPlayers();
    // matchHandWithBoardCards();
}

const enableBoardCards = (id) => {
    if (id == "JD" || id == "JC") {
        let boardCardCheck = document.querySelectorAll(`#board-cards li`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
            if (!selectedBoardCard.className.includes('xhr') && !selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.add('enable');
            }
        });
    }
    else if (id == "JS" || id == "JH") {
        let boardCardCheck = document.querySelectorAll(`#board-cards li`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
            if (selectedBoardCard.className.includes('xhr') || selectedBoardCard.className.includes('enable')) {
                if (!selectedBoardCard.hasAttribute('lock')) {
                    selectedBoardCard.classList.remove("xhr");
                    selectedBoardCard.classList.add("enable");
                }
            }
        });
    }
    else {
        let boardCardChecks = document.querySelectorAll(`#board-cards li`);
        boardCardChecks.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
        });
        let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${id}]`);
        boardCardCheck.forEach(selectedBoardCard => {
            if (selectedBoardCard.hasAttribute('color')) {
                selectedBoardCard.classList.add('xhr');
            }
            if (!selectedBoardCard.className.includes('xhr') && !selectedBoardCard.className.includes('enable')) {
                selectedBoardCard.classList.add('enable');
            }
        });
    }
}
const mappingFunction = (id) => {
    let boardCardCheck = document.querySelectorAll(`#board-cards li[card=${id}]`);
    let count = 0;
    let playerlist = document.querySelectorAll(".players");
    playerlist.forEach(played => {
        played.classList.remove("active");
        let activeplayer = document.getElementById(`player${currentPlayer}`);
        activeplayer.classList.add("active");
    });
    boardCardCheck.forEach(selectedBoardCard => {
        if (selectedBoardCard.classList.contains('xhr') == false) {
            // Enabling Board Cards according to Handed Cards
            // selectedBoardCard.classList.add('enable');
        }
        // For Dead Cards
        else {
            count++;
        }
        let handcard = document.querySelector(`#user${currentPlayer} #${id}`);
        if (count > 0) {
            if (handcard.classList.contains("dead")) {
                handcard.classList.remove("dead")
                handcard.removeChild(handcard.children[2]);
                handcard.removeChild(handcard.children[1]);
            }
        }
        if (count >= 2) {
            handcard.classList.add("dead");
            let div = document.createElement("div");
            let divs = document.createElement("div");
            divs.setAttribute("class", "deadcard-icon");
            div.setAttribute("class", "deadcard");
            div.innerHTML = "Dead Card";
            handcard.appendChild(divs);
            handcard.appendChild(div);
        }
    })
}
const disableBoardCards = () => {
    let removeClass = document.querySelectorAll('#board-cards li');
    removeClass.forEach(removes => {
        removes.classList.remove('enable');
    });
}
// Disable all Users Cards and Enable Active user
function disableUsers() {
    let disables = document.querySelectorAll(".positions");
    disables.forEach(disablesall => {
        disablesall.classList.add("disable-user")
    })
    document.getElementById(`positions${currentPlayer}`).classList.remove("disable-user");
}
const BoardClickCardId = (e) => {
    let cardinfo = e.currentTarget;
    let cardid = cardinfo.getAttribute("card");
    let enableCards = document.querySelectorAll('#board-cards .enable');
    let enableCardsRemove = document.querySelectorAll('#board-cards li');
    enableCards.forEach(enables => {
        enables.classList.remove('enable');
    });

    // For Single Eyed Jack Cards
    if (cardid == "JS" || cardid == "JH") {
        cardinfo.classList.remove(color[0], color[1], color[2], "xhr");
        cardinfo.removeAttribute('color', player.color);
        enableCardsRemove.forEach(adding => {
            let a = adding.hasAttribute("color");
            if (a === true) { adding.classList.add("xhr"); }
        });
    }
    else {
        cardinfo.classList.add(player.color, "xhr");
        cardinfo.setAttribute('color', player.color);
    }
    pushCard(cardinfo, cardid);
}

const PlayerClickCardId = (e) => {
    Object.assign(player, { cards: allPlayerCards[currentPlayer] });
    let id = e.currentTarget.id;
    disableUsers();
    disableBoardCards();
    mappingFunction(id);
    enableBoardCards(id);
}

export default PlayingPage;
