'use strict';

const Race = require('./Race');
const path = require('path');

class Elf extends Race {
  constructor() {
    super(path.resolve(__dirname, './Elf.json'));
  }
}

module.exports = Elf;
