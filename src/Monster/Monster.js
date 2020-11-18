'use strict';

const Entity = require('../Entity');
const { isEmpty, readJsonFile } = require('../Utility');
const gaussian = require('gaussian');

class Monster extends Entity {
  constructor(monsterPath, level, name, { equipements = [], stats = {} } = {}) {
    const monster = readJsonFile(monsterPath);
    stats = Monster.computeStat(monster.stats, stats, level);
    super(
      level,
      monster.race,
      monster.size,
      name,
      monster.dv,
      monster.acBase,
      monster.bba,
      monster.color,
      { equipements, stats }
    );
    this.grade = monster.grade;
    this.location = monster.location;
  }

  loseHP(toLose) {
    let msg = super.loseHP(toLose);
    if (this.attr.hp.actual <= 0) {
      msg += '\n' + this.name + ' is dead!';
    }
    return msg;
  }

  static computeStat(monsterStats, stats, level) {
    if (isEmpty(stats)) {
      stats = {};
      const tmp = (expr) =>
        Entity.getFunctionFromExpression('level', expr)(level);
      for (let stat in monsterStats) {
        const distribution = gaussian(
          tmp(monsterStats[stat].mean),
          tmp(monsterStats[stat].variance)
        );
        stats[stat] = Math.round(distribution.ppf(Math.random()));
      }
    }
    return stats;
  }
}

module.exports = Monster;
