'use strict';

const { Stats } = require('../Stats');
const Monster = require('./Monster');

const gaussian = require('gaussian');

class Goblin extends Monster {
  constructor(level) {
    const stats = Goblin.computeBaseStat();
    // level, size, grade, location
    super(level, 'P', 1, 'Dungeon', { stats, dv: 8, bba: 1 });
  }

  static computeBaseStat() {
    const distrib = gaussian(10, 3);
    let stats = {};
    for (let stat of Stats) {
      const randStat = distrib.ppf(Math.random());
      stats[stat] = Math.round(randStat);
    }
    stats.dex += 2;
    stats.wis -= 1;
    stats.cha -= 3;
    return stats;
  }
}

module.exports = Goblin;
