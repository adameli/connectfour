
//* startPage
const startGameButton = document.getElementById("playGame");

startGameButton.addEventListener("click", () => {
    window.location = "connectfour.html";
    window.localStorage.setItem("player1", "0");
    window.localStorage.setItem("player2", "0");
});

