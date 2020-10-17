'use strict';

const Entity = require('../Entity');

class Class extends Entity {
  constructor(level, race, name, stats, modRace) {
    const size = race.getSize();
    stats = Class.addStatRace(stats, race.getStat(modRace));
    super(level, size, name, stats);
  }

  loseHP(toLose) {
    let msg = super.loseHP(toLose);
    if (this.attr.hp.actual <= 0) {
      msg += '\n' + this.name + ' is unconscious!';
    }
    return msg;
  }

  static getNumberStat(level) {
    return 16 + Math.floor(level / 5);
  }

  static addStatRace(stats, raceStat) {
    for (let i in raceStat) {
      stats[i] += raceStat[i];
    }
    return stats;
  }
}

module.exports = Class;

// super.getStat > read JSOn
// super.getStat(path file)
