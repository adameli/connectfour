
const boardGame = document.querySelector(".boardGame");

document.getElementById("menu").addEventListener("click", () => {
    window.location = `./`
})

for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 7; column++) {
        let divSlot = document.createElement("div");
        divSlot.classList.add("emptySlot");
        boardGame.append(divSlot);
        divSlot.style.gridArea = `${row} / ${column}`;
        
    }
    
}

for (let i = 0; i < 7; i++) {
    let slotButton = document.createElement("div");
        slotButton.classList.add("slotButtons");
        document.querySelector(".boardHeader").append(slotButton);
    
}