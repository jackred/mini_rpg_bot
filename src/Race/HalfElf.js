'use strict';

const Race = require('./Race');
const path = require('path');

class HalfElf extends Race {
  constructor() {
    super(path.resolve(__dirname, './HalfElf.json'));
  }
}

module.exports = HalfElf;
