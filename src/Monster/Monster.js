'use strict';

const Entity = require('../Entity');
const gaussian = require('gaussian');

class Monster extends Entity {
  constructor(monsterPath, level, name, { stats, equipements } = {}) {
    const monster = Entity.readJsonFile(monsterPath, 'src/Monster/');
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
    if (stats === undefined) {
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
