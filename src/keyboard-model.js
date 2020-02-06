const WordChooser = require('./word-chooser');
const Dictionary = require('./dictionary');

const PUNCTUATION = {
  period: '.',
  comma: ',',
  questionMark: '?',
  exclamationMark: '!',
  leftParen: '(',
  rightParen: ')',
  laughter: '😂'
};

module.exports = class KeyboardModel {
  constructor() {
    this._wordChooser = new WordChooser(new Dictionary());
    this._firstWord = true;
  }

  getChoices() {
    return this._wordChooser.getChoices();
  }

  getPunctuation() {
    return PUNCTUATION;
  }

  selectWord(word) {
    this._reset();
    this._firstWord = false;
    return `${this._firstWord ? '' : ' '}${word}`;
  }
  
  selectSide(side) {
    this._wordChooser.selectSide(side);
  }

  selectPunctuation(name) {
    this._reset();
    if (PUNCTUATION[name] !== undefined) {
      return `${PUNCTUATION[name]} `;
    }
    return '';
  }

  _reset() {
    this._wordChooser.reset();
  }
};
