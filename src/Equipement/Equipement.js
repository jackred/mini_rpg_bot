'use strict';

const { readJsonFile } = require('../Utility');

class Equipement {
  constructor({
    bonus = {},
    name = '',
    equipementType = '',
    userType = '',
    size = '',
    type = '',
  } = {}) {
    this.bonus = bonus;
    this.name = name;
    this.size = size;
    this.type = type;
    this.equipementType = equipementType;
    this.userType = userType;
  }

  static fromFile(path) {
    const equipement = readJsonFile(path);
    return new Equipement(equipement);
  }
}

module.exports = Equipement;
