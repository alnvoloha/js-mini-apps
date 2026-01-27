const rock = document.querySelector("#rock0")
const paper = document.querySelector("#paper1")
const scissors = document.querySelector("#scissors2")


rock.addEventListener('click', rockClickHandler)

var computerCount = 0;
var humanCount = 0;

function rockClickHandler () {

    const computer = String(Math.round(Math.random() * 2));
    console.log(computer);

    if (computer == 1) {
        computerCount++;
        result.innerHTML += `<div>Вы (камень) ${humanCount} - компьютер ${computerCount} (бумага)</div>`;
    }

    if (computer == 0) {
        result.innerHTML += `<div>Вы (камень) ${humanCount} - компьютер ${computerCount} (камень) Ничья! </div>`;
    }

    if (computer == 2) {
        humanCount++;
        result.innerHTML += `<div>Вы (камень) ${humanCount} - компьютер ${computerCount} (ножницы) </div>`;
    }

}

scissors.addEventListener('click', scissorsClickHandler)

function scissorsClickHandler () {

    const computer = String(Math.round(Math.random() * 2));
    console.log(computer);

    if (computer == 1) {
        humanCount++;
        result.innerHTML += `<div>Вы (ножницы) ${humanCount} - компьютер ${computerCount} (бумага)</div>`;
    }

    if (computer == 0) {
        computerCount++;
        result.innerHTML += `<div>Вы (ножницы) ${humanCount} - компьютер ${computerCount} (камень) </div>`;
    }

    if (computer == 2) {
        result.innerHTML += `<div>Вы (ножницы) ${humanCount} - компьютер ${computerCount} (ножницы) Ничья! </div>`;
    }

}

paper.addEventListener('click', paperClickHandler)

function paperClickHandler () {

    const computer = String(Math.round(Math.random() * 2));
    console.log(computer);

    if (computer == 1) {
        result.innerHTML += `<div>Вы (бумага) ${humanCount} - компьютер ${computerCount} (бумага) Ничья!</div>`;
    }

    if (computer == 0) {
        humanCount++;
        result.innerHTML += `<div>Вы (бумага) ${humanCount} - компьютер ${computerCount} (камень) </div>`;
    }

    if (computer == 2) {
        computerCount++;
        result.innerHTML += `<div>Вы (бумага) ${humanCount} - компьютер ${computerCount} (ножницы) </div>`;
    }

}