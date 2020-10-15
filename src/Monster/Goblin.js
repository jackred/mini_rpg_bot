'use strict';

const { Stats } = require('../Stats');
const Monster = require('./Monster');

const gaussian = require('gaussian');

class Goblin extends Monster {
  constructor(level, name, stats) {
    if (stats === undefined) {
      stats = Goblin.getStatsModRace(level);
    }
    super(level, 'P', name, stats);
  }

  static getSize() {
    return 'P';
  }

  static getBBA(level) {
    return 1 + Math.round(level / 3);
  }

  static getDV() {
    return 8;
  }

  static getAcBase() {
    return 8;
  }

  static getStatsModRace(level) {
    const distrib = gaussian(10 + level / 4, 2 + level / 4);
    let stats = {};
    for (let stat of Stats) {
      const randStat = distrib.ppf(Math.random());
      stats[stat] = Math.round(randStat);
    }
    stats.dex += 3;
    stats.wis -= 1;
    stats.cha -= 3;
    return stats;
  }
}

module.exports = Goblin;
