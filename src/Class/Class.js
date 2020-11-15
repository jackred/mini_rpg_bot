'use strict';

const Entity = require('../Entity');
const { getDefaultStats } = require('../Stats');

class Class extends Entity {
  constructor(
    classPath,
    level,
    name,
    race,
    { equipements = {}, stats = {}, modRace = {} } = {}
  ) {
    const size = race.size;
    const raceName = race.name;
    const class_ = Entity.readJsonFile(classPath);
    // TODO change class to smth else
    stats = Class.addStatRace(stats, race.getStat(modRace));
    console.log(stats);
    super(
      level,
      raceName,
      size,
      name,
      class_.dv,
      class_.acBase,
      class_.bba,
      class_.color,
      { equipements, stats }
    );
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
    let defaultStats = getDefaultStats();
    for (let i in raceStat) {
      if (!(i in stats)) {
        stats[i] = defaultStats[i];
      }
      stats[i] += raceStat[i];
    }
    return stats;
  }
}

module.exports = Class;

// super.getStat > read JSOn
// super.getStat(path file)
