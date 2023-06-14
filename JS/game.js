
const boardGame = document.querySelector(".boardGame");
let currentPlayer = 1;
let player1Count = 0;
let player2Count = 0;

document.getElementById("menu").addEventListener("click", () => {
    window.location = `./`
})
document.getElementById("restart").addEventListener("click", () => {
    window.location = "connectfour.html";
})

let datasetId = 1;
for (let row = 1; row < 7; row++) {
    for (let column = 1; column < 8; column++) {
        let divSlot = document.createElement("div");
        divSlot.classList.add("gameSlot");
        divSlot.classList.add("empty");
        divSlot.dataset.slotId = datasetId;
        boardGame.append(divSlot);
        divSlot.style.gridArea = `${row} / ${column}`;
        datasetId++;
    }

}

for (let i = 0; i < 7; i++) {
    let slotButton = document.createElement("div");
    slotButton.classList.add("slotButtons");
    slotButton.dataset.slotDecider = i;
    slotButton.addEventListener("click", fillSlot);
    document.querySelector(".boardHeader").append(slotButton);
}

function fillSlot(event) {
    let slotColumn = event.currentTarget.dataset["slotDecider"];
    let slot = slotsArray[slotColumn][0];
    if (slotsArray[slotColumn].length === 0) {
        return;
    }
    const correctSlot = document.querySelector(`[data-slot-id="${slot}"]`);
    correctSlot.id = `player${currentPlayer}`;
    correctSlot.classList.remove(`empty`);
    correctSlot.classList.add(`filled`);
    slotsArray[slotColumn].splice(0, 1);

    currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
    document.querySelector("#playerone").classList.toggle("currentPlayer");
    document.querySelector("#playertwo").classList.toggle("currentPlayer");

    controllBoardGameWinner();
}

function controllBoardGameWinner() {

    // Controlles the rows ____________________________________
    for (let row = 6; row > 0; row--) {
        resetPlayerCount();
        for (let column = 1; column < 8; column++) {
            let element = document.querySelector(`[style="grid-area: ${row} / ${column};"]`);
            if (element.classList.contains("empty")) {
                player1Count = 0;
                player2Count = 0;
                continue
            }

            let winner = possibleWin(element);
            if (winner === "winner") {
                return;
            }
        }
    }

    //Controlles the columns ____________________________________
    for (let column = 1; column < 8; column++) {
        for (let row = 6; row > 0; row--) {
            let element = document.querySelector(`[style="grid-area: ${row} / ${column};"]`);
            if (element.classList.contains("empty")) {
                player1Count = 0;
                player2Count = 0;
                continue
            }
            let winner = possibleWin(element);
            if (winner === "winner") {
                return;
            }
        }
    }

    //Controlles the diagonals ____________________________________
    for (let row = 6; row > 0; row--) {
        for (let column = 1; column < 8; column++) {
            let element = document.querySelector(`[style="grid-area: ${row} / ${column};"]`);
            if (element.classList.contains("empty")) {
                player1Count = 0;
                player2Count = 0;
                continue;
            }

            let rowStart = parseInt(element.style["grid-row-start"]);
            let columnStart = parseInt(element.style["grid-column-start"]);

            possibleWin(element);
            resetPlayerCount();
            controllDiagnoal(rowStart, columnStart, "diagLeft");

            possibleWin(element);
            resetPlayerCount();
            controllDiagnoal(rowStart, columnStart, "diagRight");
        }
    }
}
function controllDiagnoal(row, column, decider) {
    for (let diagIndex = 0; diagIndex < 3; diagIndex++) {
        row--;
        decider === "diagRight" ? column++ : column--;

        let diagElement = document.querySelector(`[style="grid-area: ${row} / ${column};"]`);
        if (diagElement === null) {
            resetPlayerCount();
            break;
        }
        if (diagElement.classList.contains("empty")) {
            resetPlayerCount();
            break;
        }
        let winner = possibleWin(diagElement);
        if (winner === "winner") {
            return;
        }
    }
}
function possibleWin(element) {
    const currentPlayer = element.id;
    const otherPlayer = currentPlayer === "player1" ? "playertwo" : "playerone";
    let emoji = "";
    if (currentPlayer === "player1") {
        emoji = "playerone";
        player1Count++;
        player2Count = 0
    }
    if (currentPlayer === "player2") {
        emoji = "playertwo";
        player2Count++;
        player1Count = 0
    }
    if (player1Count === 4 || player2Count === 4) {
        document.querySelector(`#${emoji}`).classList.add("winner");
        document.querySelector(`#${otherPlayer}`).classList.add("loser");
        console.log(currentPlayer + " is the winner");
        return "winner";
    }
}

function resetPlayerCount() {
    player1Count = 0;
    player2Count = 0;
}
