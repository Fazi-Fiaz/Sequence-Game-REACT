import { useEffect, useRef } from 'react';
import { currentPlayer } from '../../../Constants';

function Mapping({
    id
}) {
    if (!id) { return null };
    console.log("Card ID Card Listing Component", id);
    // let count = 0;
    // let boardCardCheck = useRef(null);
    // let playerlist = useRef(null);

    // useEffect(() => {
    //     boardCardCheck.current = document.querySelectorAll(`#board-cards li[card=${id}]`);
    //     playerlist.current = document.querySelectorAll(".players");
    // }, [id]);

    // useEffect(() => {
    //     playerlist.current.forEach(played => {
    //         played.classList.remove("active");
    //     });
    //     let activeplayer = document.getElementById(`player${currentPlayer}`);
    //     activeplayer.classList.add("active");

    //     boardCardCheck.current.forEach(selectedBoardCard => {
    //         if (!selectedBoardCard.classList.contains('xhr')) {
    //             // Enabling Board Cards according to Handed Cards
    //             // selectedBoardCard.classList.add('enable');
    //         } else {
    //             count++;
    //         }

    //         let handcard = document.querySelector(`#user${currentPlayer} #${id}`);

    //         if (count > 0) {
    //             if (handcard.classList.contains("dead")) {
    //                 handcard.classList.remove("dead");
    //                 handcard.removeChild(handcard.children[2]);
    //                 handcard.removeChild(handcard.children[1]);
    //             }
    //         }

    //         if (count >= 2) {
    //             handcard.classList.add("dead");
    //             let div = document.createElement("div");
    //             let divs = document.createElement("div");
    //             divs.setAttribute("class", "deadcard-icon");
    //             div.setAttribute("class", "deadcard");
    //             div.innerHTML = "Dead Card";
    //             handcard.appendChild(divs);
    //             handcard.appendChild(div);
    //         }
    //     });
    // }, [currentPlayer]);
    return null;
}

export default Mapping
