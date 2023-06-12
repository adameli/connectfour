
const boardGame = document.querySelector(".boardGame");
let currentPlayer = 1;
let player1Count = 0;
let player2Count = 0;
let columnWinner = 0;
document.getElementById("menu").addEventListener("click", () => {
    window.location = `./`
})

document.querySelector("#playerone").classList.add("currentPlayer");
// if(currentPlayer === 1){
//     document.querySelector("#playertwo").classList.remove("currentPlayer");
// }else {
//     document.querySelector("#playertwo").classList.add("currentPlayer");
//     document.querySelector("#playerone").classList.remove("currentPlayer");
// }

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

console.log(boardGame);

function fillSlot (event) {
    let slotColumn = event.currentTarget.dataset["slotDecider"];
    let slot = slotsArray[slotColumn][0];
    if(slotsArray[slotColumn].length === 0){
        return;
    }
    const correctSlot = document.querySelector(`[data-slot-id="${slot}"]`);
    correctSlot.id = `player${currentPlayer}`;
    correctSlot.classList.remove(`empty`);
    slotsArray[slotColumn].splice(0, 1);
    // if(currentPlayer === 1){
    // }else {
    // }
    if(currentPlayer === 1){
        currentPlayer = 2;
        document.querySelector("#playertwo").classList.add("currentPlayer");
        document.querySelector("#playerone").classList.remove("currentPlayer");
    }else {
        document.querySelector("#playerone").classList.add("currentPlayer");
        document.querySelector("#playertwo").classList.remove("currentPlayer");
        currentPlayer = 1;
    }
    
    checkWinner();
}

function checkWinner () {
    for (let row = 6; row > 0; row--) {
        for (let column = 1; column < 8; column++) {
            let element = document.querySelector(`[style="grid-area: ${row} / ${column};"]`);
            if(element.classList.contains("empty")){
                player1Count = 0;
                player2Count = 0;
                continue
            }
            checkRowWinner(element);
            
        }
        
    }
    
}

function checkRowWinner (element) {
    let id = element.id;
    if(id === "player1"){
        player1Count++;
        player2Count = 0
    }
    if(id === "player2"){
        player2Count++;
        player1Count = 0
    }
    if(player1Count === 4) {
        console.log(id + " is the winner");
    } 
    if (player2Count === 4){
        console.log(id + " is the winner");
    }
}