'use strict';

const Entity = require('../Entity');

class Monster extends Entity {
  constructor(level, size, name, stats) {
    super(level, size, name, stats);
    this.grade = this.constructor.getGrade();
    this.location = this.constructor.getLocation();
  }

  loseHP(toLose) {
    let msg = super.loseHP(toLose);
    if (this.attr.hp <= 0) {
      msg += '\n' + this.name + ' is dead!';
    }
    return msg;
  }

  static getGrade() {
    return 1;
  }

  static getLocation() {
    return ['Dungeon'];
  }
}

module.exports = Monster;
