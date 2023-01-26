import doubleDeck from '../Constants'
import { id } from '../MyComponents/BoardComponents/PlayerCards/PlayerCardListing'

export const shuffle = (doubleDeck) => {
    const arr_val = doubleDeck;
    for (let ar = 0; ar < arr_val.length; ar++) {
        let j = parseInt(Math.random() * arr_val.length);
        let temp = arr_val[ar];
        arr_val[ar] = arr_val[j];
        arr_val[j] = temp;
    }
    return arr_val;
}

export const enableSelectedCards = (id) => {
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