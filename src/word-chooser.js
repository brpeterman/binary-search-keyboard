const Dictionary = require('./dictionary');

function middleIndex(low, high) {
  return Math.trunc((high - low) / 2) + low;
}

module.exports = class WordChooser {
  constructor(dictionary) {
    this._dictionary = dictionary;
    this.reset();
  }

  getChoices() {
    return {
      left: this._dictionary.getWord(this._firstIndex),
      right: this._dictionary.getWord(this._lastIndex),
      middle: this._dictionary.getWord(middleIndex(this._firstIndex, this._lastIndex))
    };
  }

  selectSide(side) {
    if (side === 'left') {
      this._lastIndex = middleIndex(this._firstIndex, this._lastIndex);
    } else if (side === 'right') {
      this._firstIndex = middleIndex(this._firstIndex, this._lastIndex);
    }
  }

  reset() {
    this._firstIndex = 0;
    this._lastIndex = this._dictionary.getLength() - 1;
  }
};
