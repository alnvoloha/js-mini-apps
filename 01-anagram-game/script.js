import { words } from "./words.js";
import { getElement, onClick, onEnter } from "./utils.js";

const inputWord = getElement("input-word");
const hintButton = getElement("hint-button");
const guessButton = getElement("guess-button");
const restartButton = getElement("restart-button");

let selectedWordObject = null;

function startGame(words) {
  selectedWordObject = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWordObject.word);

  const hint = selectedWordObject.hint;
  const outputWord = scrambleWord(selectedWordObject.word);

  getElement("hint-text").textContent = hint;
  getElement("output-word").textContent = outputWord;

  inputWord.value = ""; 
  getElement("result").textContent = "";
}

function scrambleWord(word) {
    let scrambled = word;
    while (word == scrambled && word.length > 1){
        scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    }
    return scrambled;
}

function resultProcessing (){
const userAnswer = inputWord.value.trim().toLowerCase();
  const correctAnswer = selectedWordObject.word;
  const result = userAnswer === correctAnswer;
  
  const resultDOM = getElement("result");

  resultDOM.textContent = result ? "Correct!" : "Try again";
  resultDOM.classList.remove("text-green-500", "text-red-500");
  resultDOM.classList.add(result ? "text-green-500" : "text-red-500");
}

onEnter(inputWord, ()=> resultProcessing());
onClick(guessButton, ()=> resultProcessing());
onClick(hintButton, ()=> getElement("hint-text").classList.toggle("visible"));
onClick(restartButton, ()=> startGame(words));

startGame(words);
