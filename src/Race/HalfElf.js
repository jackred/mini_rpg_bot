'use strict';

const Race = require('./Race');

class HalfElf extends Race {
  static getStat(attr) {
    return { [attr]: 2 };
  }
  static getSize() {
    return 'M';
  }
}

module.exports = HalfElf;
