# Minesweeper (Sapper)

Classic **Minesweeper** in the browser: open safe cells, mark mines with flags, and clear the whole field.

## Features

- Difficulty presets: **Easy / Medium / Hard**
- Custom settings: board size and mines count
- **First click is always safe** (mines are placed after the first click, avoiding the first cell + neighbors)
- **Right-click flagging (🚩)** + mines-left counter
- Timer (starts on the first move)
- Win / lose detection
- New game button

## Controls

- **Left click** — open a cell
- **Right click** — place/remove a flag (🚩)

## How to run

Open `index.html` in a browser.

## Project structure

10-minesweeper/
index.html
style.css
script.js
README.md

## Tech

HTML • CSS (Grid/Flex, responsive) • JavaScript

## Implementation notes

- Mines are generated **on the first click** to guarantee a safe start.
- Empty areas open automatically using **flood fill**.
- Hash-free, dependency-free, works great on **GitHub Pages**.
