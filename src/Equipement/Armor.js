'use strict';

const Equipement = require('./Equipement');

class Armor extends Equipement {
  constructor(...arg) {
    super({ ...arg, type: 'armor' });
  }
}

module.exports = Armor;
