import { getElement, onClick} from "./utils.js";

const startGameButton = document.getElementById("start-game-button");

startGameButton.addEventListener("click", ()=>{
    startGame();
});

function startGame(){
    console.log("Starting the game...");
    window.location.href = "game_page.html";
};


