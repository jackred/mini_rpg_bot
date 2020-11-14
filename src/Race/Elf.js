'use strict';

const Race = require('./Race');

class Elf extends Race {
  constructor() {
    super('./Elf.json');
  }
}

module.exports = Elf;
