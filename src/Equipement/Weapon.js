'use strict';

const Equipement = require('./Equipement');

class Weapon extends Equipement {
  constructor(...arg) {
    super({ ...arg, type: 'weapon' });
  }
}

module.exports = Weapon;
