const symb = ["X", "O"];
let cnt = 0;
let mainContainer = main;

var field;

function startGame() {
  field = sizeGame();
  showField();
}

function sizeGame() {
  const N = document.querySelector("#size").value;
  field = Array.from({ length: N }, () => Array.from({ length: N }, () => " "));
  return field;
}

function showField() {
  mainContainer.innerHTML = "";

  const tbl = document.createElement("table");

  field.forEach((row, i) => {
    const tr = document.createElement("tr");

    row.forEach((cell, j) => {
      const span = document.createElement("span");

      const td = document.createElement("td");
      span.textContent = cell;
      span.style.fontSize = `calc(16rem/${field.length})`;
      td.onclick = () => {
        step(i, j);
      };
      td.classList.add('cell');
      td.append(span);
      tr.append(td);
    });

    tbl.append(tr);
  });

  mainContainer.append(tbl);
}

function isWin(field, symb, cnt) {
  if (field.some(row => row.every(cell => cell === row[0] && cell !== " "))) {
    return true;
  }

  const columns = Array.from({ length: field.length }, (_, j) =>
    field.map(row => row[j])
  );

  if (columns.some(column => column.every(cell => cell === column[0] && cell !== " "))) {
    return true;
  }

  const mainDiagonal = field.map((row, i) => row[i]);
  if (mainDiagonal.every(cell => cell === mainDiagonal[0] && cell !== " ")) {
    return true;
  }

  const sideDiagonal = field.map((row, i) => row[field.length - i - 1]);

  if (sideDiagonal.every(cell => cell === sideDiagonal[0] && cell !== " ")) {
    return true;
  }

  return false;
}

function step(i, j) {
  if (field[i][j] !== " ") {
    return;
  }

  field[i][j] = symb[cnt % symb.length];
  cnt++;
  document.querySelector("#msg").innerText = `На шаге ${cnt} ходит ${symb[cnt % symb.length]}`;
  showField();
  if (isWin(field, symb, cnt)) {
    let winner = symb[(cnt - 1) % symb.length];
    showWinMessage(winner);
    return;
  }
  if (cnt === field.length * field.length) {
    showDrawMessage();
    return;
  }
}

function showDrawMessage() {
  let drawMessage = document.createElement("div");
  drawMessage.innerText = `Ничья на шаге ${cnt}`;
  drawMessage.classList.add("draw-message");

  let reloadButton = document.createElement("button");
  reloadButton.innerText = "Начать заново";
  reloadButton.addEventListener("click", function() {
    location.reload();
  });
  reloadButton.classList.add("reload-button");

  drawMessage.appendChild(reloadButton);
  document.body.appendChild(drawMessage);
}

function showWinMessage(player) {
  let winMessage = document.createElement("div");
  winMessage.innerText = `Выиграл игрок: ${player} на шаге ${cnt}`;
  winMessage.classList.add("win-message");

  let reloadButton = document.createElement("button");
  reloadButton.innerText = "Начать заново";
  reloadButton.addEventListener("click", function() {
    location.reload();
  });
  reloadButton.classList.add("reload-buttonWin");

  winMessage.appendChild(reloadButton);
  document.body.appendChild(winMessage);
}

function restartGame() {
  location.reload();
}


