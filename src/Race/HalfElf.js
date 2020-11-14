'use strict';

const Race = require('./Race');

class HalfElf extends Race {
  constructor() {
    super('./HalfElf.json');
  }
}

module.exports = HalfElf;
