
const PRESETS = {
  easy:   { size: 10, mines: 15 },
  medium: { size: 16, mines: 40 },
  hard:   { size: 22, mines: 90 },
};

const MINE = -1;

let N = 10;
let MINES = 15;

let field = [];
let open = [];
let flag = [];

let started = false;     // timer started
let initialized = false; // mines placed after first click
let gameOver = false;

let seconds = 0;
let timerId = null;

const els = {
  preset: document.getElementById("preset"),
  size: document.getElementById("size"),
  mines: document.getElementById("mines"),
  newGame: document.getElementById("newGame"),
  minesLeft: document.getElementById("minesLeft"),
  timer: document.getElementById("timer"),
  status: document.getElementById("status"),
  boardWrap: document.getElementById("boardWrap"),
};

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function setStatus(text, tone = "muted") {
  els.status.textContent = text;
  els.status.style.color =
    tone === "ok" ? "var(--ok)" :
    tone === "danger" ? "var(--danger)" :
    "var(--muted)";
}

function startTimer() {
  if (timerId) return;
  timerId = setInterval(() => {
    seconds++;
    els.timer.textContent = String(seconds);
  }, 1000);
}

function stopTimer() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  els.timer.textContent = "0";
}

function countFlags() {
  let cnt = 0;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (flag[r][c]) cnt++;
  return cnt;
}

function updateMinesLeft() {
  const left = Math.max(0, MINES - countFlags());
  els.minesLeft.textContent = String(left);
}

function alloc() {
  field = Array.from({ length: N }, () => Array(N).fill(0));
  open  = Array.from({ length: N }, () => Array(N).fill(false));
  flag  = Array.from({ length: N }, () => Array(N).fill(false));
}

function neighbors(r, c) {
  const res = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const rr = r + dr, cc = c + dc;
      if (rr >= 0 && rr < N && cc >= 0 && cc < N) res.push([rr, cc]);
    }
  }
  return res;
}

function placeMinesAvoiding(safeSet) {
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * N);
    const c = Math.floor(Math.random() * N);
    const key = `${r},${c}`;
    if (safeSet.has(key)) continue;
    if (field[r][c] === MINE) continue;
    field[r][c] = MINE;
    placed++;
  }
}

function computeNumbers() {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (field[r][c] === MINE) continue;
      let cnt = 0;
      for (const [rr, cc] of neighbors(r, c)) {
        if (field[rr][cc] === MINE) cnt++;
      }
      field[r][c] = cnt;
    }
  }
}

function initOnFirstClick(r0, c0) {
  const safe = new Set();
  safe.add(`${r0},${c0}`);
  for (const [rr, cc] of neighbors(r0, c0)) safe.add(`${rr},${cc}`);

  placeMinesAvoiding(safe);
  computeNumbers();
  initialized = true;
}

function revealAllMines() {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (field[r][c] === MINE) open[r][c] = true;
    }
  }
}

function floodFill(r0, c0) {
  const stack = [[r0, c0]];
  while (stack.length) {
    const [r, c] = stack.pop();
    for (const [rr, cc] of neighbors(r, c)) {
      if (open[rr][cc] || flag[rr][cc]) continue;
      if (field[rr][cc] === MINE) continue;

      open[rr][cc] = true;

      if (field[rr][cc] === 0) stack.push([rr, cc]);
    }
  }
}

function allSafeOpened() {
  let openedSafe = 0;
  let totalSafe = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (field[r][c] !== MINE) {
        totalSafe++;
        if (open[r][c]) openedSafe++;
      }
    }
  }
  return openedSafe === totalSafe;
}

function onLeftClick(r, c) {
  if (gameOver) return;
  if (flag[r][c]) return;
  if (open[r][c]) return;

  if (!initialized) {
    initOnFirstClick(r, c);
    started = true;
    startTimer();
    setStatus("Игра началась", "muted");
  }

  open[r][c] = true;

  if (field[r][c] === MINE) {
    gameOver = true;
    revealAllMines();
    stopTimer();
    setStatus("Boom. Это была мина.", "danger");
    renderBoard();
    return;
  }

  if (field[r][c] === 0) floodFill(r, c);

  if (allSafeOpened()) {
    gameOver = true;
    stopTimer();
    setStatus("Победа: все безопасные клетки открыты.", "ok");
    renderBoard();
    return;
  }

  renderBoard();
}

function onRightClick(e, r, c) {
  e.preventDefault();
  if (gameOver) return;
  if (open[r][c]) return;

  flag[r][c] = !flag[r][c];
  updateMinesLeft();

  if (flag[r][c]) setStatus("Флаг поставлен", "muted");
  else setStatus("Флаг убран", "muted");

  renderBoard();
}

function cellText(r, c) {
  if (!open[r][c]) return flag[r][c] ? "🚩" : "";
  if (field[r][c] === MINE) return "💣";
  return field[r][c] === 0 ? "" : String(field[r][c]);
}

function makeBoardTable() {
  const table = document.createElement("table");
  table.className = "board";
  table.style.setProperty("--n", String(N));

  for (let r = 0; r < N; r++) {
    const tr = document.createElement("tr");
    for (let c = 0; c < N; c++) {
      const td = document.createElement("td");
      td.className = "cell";

      if (open[r][c]) td.classList.add("open");
      if (flag[r][c]) td.classList.add("flag");
      if (open[r][c] && field[r][c] === MINE) td.classList.add("mine");

      td.textContent = cellText(r, c);

      td.addEventListener("click", () => onLeftClick(r, c));
      td.addEventListener("contextmenu", (e) => onRightClick(e, r, c));

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return table;
}

function renderBoard() {
  els.boardWrap.innerHTML = "";
  els.boardWrap.appendChild(makeBoardTable());
}

function setInputsEnabled(enabled) {
  els.preset.disabled = !enabled;
  els.size.disabled = !enabled;
  els.mines.disabled = !enabled;
}

function applyPreset(value) {
  if (value === "custom") {
    els.size.disabled = false;
    els.mines.disabled = false;
    return;
  }
  const p = PRESETS[value];
  if (!p) return;
  els.size.value = String(p.size);
  els.mines.value = String(p.mines);
}

function newGameFromUI() {
  const preset = els.preset.value;

  if (preset !== "custom") applyPreset(preset);

  const size = clamp(parseInt(els.size.value, 10) || 10, 8, 30);
  const mines = clamp(parseInt(els.mines.value, 10) || 15, 1, size * size - 9);

  N = size;
  MINES = mines;

  alloc();

  started = false;
  initialized = false;
  gameOver = false;

  resetTimer();
  updateMinesLeft();

  setStatus("Нажми на поле, чтобы начать", "muted");
  renderBoard();
}

function wireUI() {
  els.preset.addEventListener("change", () => {
    applyPreset(els.preset.value);
  });

  els.size.addEventListener("change", () => {
    const v = clamp(parseInt(els.size.value, 10) || 10, 8, 30);
    els.size.value = String(v);
    const maxMines = v * v - 9;
    const cur = clamp(parseInt(els.mines.value, 10) || 15, 1, maxMines);
    els.mines.value = String(cur);
  });

  els.mines.addEventListener("change", () => {
    const v = clamp(parseInt(els.size.value, 10) || 10, 8, 30);
    const maxMines = v * v - 9;
    const cur = clamp(parseInt(els.mines.value, 10) || 15, 1, maxMines);
    els.mines.value = String(cur);
  });

  els.newGame.addEventListener("click", newGameFromUI);
}

wireUI();
applyPreset("easy");
newGameFromUI(); // initial render
