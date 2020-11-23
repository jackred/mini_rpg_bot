'use strict';

const Equipement = require('./Equipement');

// 3 types: main second range
class Weapon extends Equipement {
  constructor(...arg) {
    super({ ...arg, type: 'weapon' });
  }
}

module.exports = Weapon;
