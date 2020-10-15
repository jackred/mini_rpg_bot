'use strict';

const Class = require('./Class');

class Fighter extends Class {
  constructor(level, race, stats) {
    const bba = Fighter.getBBA(level);
    super(level, race, { dv: 10, bba: bba, stats });
  }
}

module.exports = Fighter;
