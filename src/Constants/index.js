export const cards = ["AS", "AH", "AD", "AC", "S2", "H2", "D2", "C2", "S3", "H3", "D3", "C3",
    "S4", "H4", "D4", "C4", "S5", "H5", "D5", "C5", "S6", "H6", "D6", "C6",
    "S7", "H7", "D7", "C7", "S8", "H8", "D8", "C8", "S9", "H9", "D9", "C9", "S10", "H10", "D10", "C10",
    "JS", "JH", "JD", "JC", "QS", "QH", "QD", "QC", "KS", "KH", "KD", "KC"];

export const boardDeck = ["AC", "KC", "QC", "C10", "C9", "C8", "C7", "C6",
    "AD", "S7", "S8", "S9", "S10", "QS", "KS", "AS", "C5", "S2",
    "KD", "S6", "C10", "C9", "C8", "C7", "C6", "D2", "C4", "S3",
    "QD", "S5", "QC", "H8", "H7", "H6", "C5", "D3", "C3", "S4",
    "D10", "S4", "KC", "H9", "H2", "H5", "C4", "D4", "C2", "S5",
    "D9", "S3", "AC", "H10", "H3", "H4", "C3", "D5", "AH", "S6",
    "D8", "S2", "AD", "QH", "KH", "AH", "C2", "D6", "KH", "S7",
    "D7", "H2", "KD", "QD", "D10", "D9", "D8", "D7", "QH", "S8",
    "D6", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "S9",
    "D5", "D4", "D3", "D2", "AS", "KS", "QS", "S10"];

export let currentTeam = 0;
export let noOfTurns = 0;
export let noOfTeams = 0;
export let winNo = 2;
export const maxPlayers = 2;
export const maxPlayerCards = 6;
export let winningcombinations = 2;
export let color = ["red", "blue", "green"];
export let playerName = ["Hadi", "Rafay", "Random", "Random2", "Random3", "Random4"];
export let teamgroups = [];
export let currentPlayer = 0;
export let doubleDeck = [...cards, ...cards];
export let allPlayerCards = [];
export let discardCards = [];

export let player = {
    turn: true,
    color: color[currentPlayer],
    cards: allPlayerCards[currentPlayer],
    playerName: playerName[currentPlayer]
}