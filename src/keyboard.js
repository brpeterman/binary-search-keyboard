const KeyboardModel = require('./keyboard-model');

const CHOICE = Symbol('choice');
const SIDE = Symbol('side');
const PUNCTUATION = Symbol('punctuation');


const keyboardModel = new KeyboardModel();

function preparePage() {
  const textBox = document.getElementById('message-box');
  textBox.addEventListener('click', renderKeyboard);
}

function renderKeyboard() {
  const keyboardContainer = document.getElementById('keyboard');
  while (keyboardContainer.firstChild) {
    keyboardContainer.removeChild(keyboardContainer.firstChild);
  }

  const choices = keyboardModel.getChoices();

  const optionsContainer = document.createElement('div');
  optionsContainer.id = 'options-container';
  keyboardContainer.appendChild(optionsContainer);
  const wordChoicesContainer = document.createElement('div');
  wordChoicesContainer.id = 'word-choices-container';
  optionsContainer.appendChild(wordChoicesContainer);
  const leftChoice = document.createElement('button');
  leftChoice.id = 'left-choice';
  leftChoice.textContent = choices.left;
  leftChoice.addEventListener('click', () => clickButton(CHOICE, choices.left));
  wordChoicesContainer.appendChild(leftChoice);
  const leftSide = document.createElement('button');
  leftSide.id = 'left-side';
  leftSide.textContent = '⬅';
  leftSide.addEventListener('click', () => clickButton(SIDE, 'left'));
  wordChoicesContainer.appendChild(leftSide);
  const middleChoice = document.createElement('button');
  middleChoice.id = 'middle-choice';
  middleChoice.textContent = choices.middle;
  middleChoice.addEventListener('click', () => clickButton(CHOICE, choices.middle));
  wordChoicesContainer.appendChild(middleChoice);
  const rightSide = document.createElement('button');
  rightSide.id = 'right-side';
  rightSide.textContent = '➡';
  rightSide.addEventListener('click', () => clickButton(SIDE, 'right'));
  wordChoicesContainer.appendChild(rightSide);
  const rightChoice = document.createElement('button');
  rightChoice.id = 'right-choice';
  rightChoice.textContent = choices.right;
  rightChoice.addEventListener('click', () => clickButton(CHOICE, choices.right));
  wordChoicesContainer.appendChild(rightChoice);

  const punctuationContainer = document.createElement('punctuation-container');
  punctuationContainer.id = 'punctuation-container';
  const punctuation = keyboardModel.getPunctuation();
  for (let puncName of Object.keys(punctuation)) {
    const puncButton = document.createElement('button');
    puncButton.id = `punc-${puncName}`;
    puncButton.textContent = punctuation[puncName];
    puncButton.addEventListener('click', () => clickButton(PUNCTUATION, puncName));
    punctuationContainer.appendChild(puncButton);
  }
  optionsContainer.appendChild(punctuationContainer);
}

function clickButton(buttonType, value) {
  const textBox = document.getElementById('message-box');
  let appendedValue = '';
  if (buttonType === CHOICE) {
    appendedValue = keyboardModel.selectWord(value);
  } else if (buttonType === SIDE) {
    keyboardModel.selectSide(value);
  } else if (buttonType === PUNCTUATION) {
    appendedValue = keyboardModel.selectPunctuation(value);
  }
  textBox.value = `${textBox.value}${appendedValue}`;
  renderKeyboard();
}

window.addEventListener('load', preparePage);
