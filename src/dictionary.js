const wordlist = require('an-array-of-english-words');

module.exports = class {
  constructor() {
    this.words = wordlist;
  }

  getWord(index) {
    return this.words[index];
  }

  getLength() {
    return this.words.length;
  }
};
