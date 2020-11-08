'use strict';

const Race = require('./Race');

class Elf extends Race {
  static getStat() {
    return { dex: 2, cha: 2, con: -2 };
  }

  static getSize() {
    return 'M';
  }

  static getName() {
    return 'Elf';
  }
}

module.exports = Elf;
