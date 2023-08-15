
const boardGame = document.querySelector(".boardGame");
let currentPlayer = parseInt(window.localStorage.getItem("startplayer"));
let player1Count = 0;
let player2Count = 0;

let correctTheme = window.localStorage.getItem("theme");
document.body.classList.add(correctTheme);

if (currentPlayer === 1) {
    document.querySelector("#playerone").classList.add("currentPlayer");
    document.querySelector("#playertwo").classList.remove("currentPlayer");
} else {
    document.querySelector("#playerone").classList.remove("currentPlayer");
    document.querySelector("#playertwo").classList.add("currentPlayer");
}

document.getElementById("menu").addEventListener("click", () => {
    window.localStorage.removeItem("player1");
    window.localStorage.removeItem("player2");
    window.location = `./`
})
document.getElementById("restart").addEventListener("click", () => {
    window.location = "connectfour.html";
})

document.getElementById("player1Score").textContent = window.localStorage.getItem("player1");
document.getElementById("player2Score").textContent = window.localStorage.getItem("player2");

const themeDialog = document.querySelector("dialog");
document.querySelector(".icon").addEventListener("click", () => {
    themeDialog.showModal();
})
document.querySelector(".exit").addEventListener("click", () => {
    themeDialog.close();
})

document.querySelector(".normal").addEventListener("click", () => {
    document.body.classList.remove("clean-theme");
    document.body.classList.remove("crazy-theme");
    document.body.classList.add("normal");
    window.localStorage.setItem("theme", "normal");
})
document.querySelector(".clean").addEventListener("click", () => {
    document.body.classList.remove("normal");
    document.body.classList.remove("crazy-theme");
    document.body.classList.add("clean-theme");
    window.localStorage.setItem("theme", "clean-theme");
})
document.querySelector(".crazy").addEventListener("click", () => {
    document.body.classList.remove("clean-theme");
    document.body.classList.remove("normal");
    document.body.classList.add("crazy-theme");
    window.localStorage.setItem("theme", "crazy-theme");
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
    let slotButton = document.createElement("button");
    const hoverAnimationParent = document.createElement("div");
    hoverAnimationParent.classList.add("animationParent");
    slotButton.append(hoverAnimationParent)
    slotButton.classList.add("slotButtons");
    slotButton.dataset.slotDecider = i;
    slotButton.addEventListener("click", fillSlot);
    slotButton.addEventListener("mouseenter", hoverAnimation);
    slotButton.addEventListener("mouseleave", cancelAnimation);
    document.querySelector(".boardHeader").append(slotButton);
}

function cancelAnimation(event) {
    event.currentTarget.children[0].childNodes.forEach(element => {
        element.remove()
    })
}

function hoverAnimation(event) {
    const brotherDom = document.createElement("div");
    brotherDom.classList.add("animationBrother");
    event.currentTarget.children[0].append(brotherDom);
    let id = event.currentTarget.dataset["slotDecider"]
    let unfilledSlots = slotsArray[id].length;


    let delay = 1;
    for (let i = 0; i < unfilledSlots; i++) {
        let effectDiv = document.createElement("div");
        effectDiv.classList.add("animationChild");
        effectDiv.classList.add(`animationDelay--${delay}ms`);
        brotherDom.append(effectDiv);
        delay++;
    }
}


function fillSlot(event) {
    cancelAnimation(event);
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
            controllDiagnoal(rowStart, columnStart, "diagLeft");
            resetPlayerCount();

            possibleWin(element);
            controllDiagnoal(rowStart, columnStart, "diagRight");
            resetPlayerCount();
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
        document.querySelectorAll(".slotButtons").forEach(button => button.setAttribute("disabled", true))
        let playerPoints = parseInt(window.localStorage.getItem(currentPlayer));
        let newPoint = playerPoints += 1;
        document.getElementById(currentPlayer + "Score").textContent = newPoint;
        window.localStorage.setItem(currentPlayer, `${newPoint}`);
        let startPlayer = window.localStorage.getItem("startplayer");
        console.log(startPlayer);
        startPlayer === "1" ? window.localStorage.setItem("startplayer", 2) : window.localStorage.setItem("startplayer", 1);
        return "winner";
    }
}

function resetPlayerCount() {
    player1Count = 0;
    player2Count = 0;
}
