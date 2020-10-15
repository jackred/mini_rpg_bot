'use strict';

const { Stats } = require('../Stats');
const Monster = require('./Monster');

const gaussian = require('gaussian');

class Goblin extends Monster {
  constructor(level) {
    const statsModRace = Goblin.computeBaseStat(level);
    // level, size, grade, location
    super(level, 'P', 1, 'Dungeon', {
      dv: 8,
      bba: 1,
      acBase: 8,
      statsModRace,
    });
  }

  static computeBaseStat(level) {
    const distrib = gaussian(level / 4, 2 + level / 4);
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
