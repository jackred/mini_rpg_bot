'use strict';

const Class = require('./Class');
const Utility = require('../Utility');
const path = require('path');

class Fighter extends Class {
  constructor(
    level,
    name,
    race,
    { equipements = {}, stats = {}, modRace = {} } = {}
  ) {
    super(
      path.resolve(__dirname, './Fighter.json'),
      level,
      name,
      race,
      modRace,
      {
        equipements,
        stats,
      }
    );
  }

  baseAttack(target) {
    const roll = Utility.roll(20);
    const toHit = this.attr.cac + roll;
    let msg = `${this.name} rolled ${roll}: ${toHit} to hit.`;
    if (target.isHit(toHit)) {
      msg += '\n That hit!';
      const damage = Utility.roll(6);
      const totalDamage = damage + this.equipements.atk;
      msg += '\nDamage rolled: ' + damage + '. Total damage: ' + totalDamage;
      msg += '\n' + target.loseHP(totalDamage);
    } else {
      msg += 'Miss!';
    }
    return msg;
  }
}

module.exports = Fighter;
