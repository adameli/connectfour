
//* startPage
const startGameButton = document.getElementById("playGame");
const rulesButton = document.getElementById("rules");

startGameButton.addEventListener("click", () => {
    window.location = "connectfour.html";
    window.localStorage.setItem("player1", "0");
    window.localStorage.setItem("startplayer", "1");
    window.localStorage.setItem("player2", "0");
    window.localStorage.setItem("theme", "clean-theme");
});

const dialog = document.querySelector("dialog");
rulesButton.addEventListener("click", () => {
    dialog.showModal();
})

document.querySelector("#closeDialog").addEventListener("click", () => {
    dialog.close();
})

document.querySelector("#playFriend").addEventListener("click", () => {
    window.alert("This function is in working progress, expected realse date 1 jan 2024")
})



