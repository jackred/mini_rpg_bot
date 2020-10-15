'use strict';

const Entity = require('../Entity');
const { DefaultStats } = require('../Stats');

class Class extends Entity {
  constructor(level, race, { dv, acBase, bba, stats } = {}) {
    const statsModRace = race.getStat();
    const size = race.getSize();
    super(level, size, { dv, acBase, bba, statsModRace, stats });
  }

  static getBBA(level) {
    return level;
  }

  static getNumberStat(level) {
    return 16 + Math.floor(level / 5);
  }
}

module.exports = Class;
