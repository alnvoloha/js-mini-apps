import { getElement, onClick } from "./utils.js";



const quitGameButton = document.getElementById("quit-game-button");
const tryAgainButton = document.getElementById("try-again-button");
const result = document.getElementById("result");

const initialState = ['L', 'L', 'L', '', 'R', 'R', 'R'];
let state = [...initialState];

function render() {
    const board = document.getElementById("board");
    board.innerHTML = '';
    state.forEach((frog, index) => { // frog -- это L или R
        const cell = document.createElement("button");
        cell.innerText = frog;
       let baseClasses = "mt-50 m-3 p-5 px-7 rounded-full ";

        if (frog === '') {
            cell.className = `${baseClasses} bg-orange-900 px-8`;
        }else if(frog === 'R') {
            cell.className = `${baseClasses} bg-blue-900 text-white`;
         } else {
            cell.className = `${baseClasses} bg-green-800 text-white`;
        }

        cell.disabled = frog === '';
        cell.onclick = () => tryMove(index);
        board.appendChild(cell);
    });
}

function tryMove(index) {
    const emptyIndex = state.indexOf('');

    if (state[index] === 'L') {
        if (index + 1 === emptyIndex || index + 2 === emptyIndex) {
            swap(index, emptyIndex);
        }
    }


    else if (state[index] === 'R') {
        if (index - 1 === emptyIndex || index - 2 === emptyIndex) {
            swap(index, emptyIndex);
        }
    }

    render();
    checkWin();
}


 function swap(i, j) {
    [state[i], state[j]] = [state[j], state[i]];
}

function reset() {
    state = [...initialState];
    render();
}

function checkWin() {
   // console.log("Current state:", state.join(''));
    if (state.join('') === 'RRRLLL') {
        result.innerText = "Winner!";
        result.className = " text-2xl text-green-300 flex justify-center mt-3 ";
    }
}

window.onload = render;

onClick(tryAgainButton, ()=> reset());
onClick(quitGameButton, ()=> quit());



function quit(){
    window.location.href = "index.html";
}