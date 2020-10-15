'use strict';

const Race = require('./Race');

class Elf extends Race {
  static getStat() {
    return { dex: 2, cha: 2, con: -2 };
  }

  static getSize() {
    return 'M';
  }
}

module.exports = Elf;
