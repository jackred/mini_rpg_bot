'use strict';

const { getDefaultStats } = require('./Stats');
const Size = require('./Size');
const fs = require('fs');

class Entity {
  constructor(
    level,
    race,
    size,
    name,
    dv,
    acBase,
    bba,
    color,
    { equipements, stats = getDefaultStats() } = {}
  ) {
    this.race = race;
    this.name = name;
    this.level = level;
    this.size = { size, ...Size[size] };
    this.initProperty(bba);
    this.setStatBase(stats);
    this.setEquipement(equipements);
    this.setAttributs(dv, acBase, bba);
    this.computeAttributs();
    this.setUtilityInfo(color);
  }

  initProperty() {
    this.attr = {};
    this.attr.ac = {};
    this.attr.hp = {};
    this.equipements = {};
    this.equipements.armor = {};
    this.equipements.wearpon = {};
  }

  setAttributs(dv, acBase, bba) {
    this.attr.dv = dv;
    this.attr.ac.base = acBase;
    this.attr.bba_f = Entity.getFunctionFromExpression('level', bba);
  }

  computeAttributs() {
    this.attr.bba = this.attr.bba_f(this.level);
    const tmp = this.attr.dv + this.stats.con.mod;
    this.attr.hp = {
      max: tmp * this.level,
      actual:
        this.attr.hp.actual !== undefined
          ? this.hp.actual + tmp
          : tmp * this.level,
    };
    this.attr.ac.total =
      this.equipements.def +
      this.attr.ac.base +
      this.stats.dex.mod +
      this.size.mod;
    this.attr.cac = this.attr.bba + this.stats.str.mod + this.size.mod;
    this.attr.dist = this.attr.bba + this.stats.dex.mod + this.size.mod;
    this.attr.init = this.stats.dex.mod;
  }

  setEquipement(equipements = {}) {
    this.equipements = equipements;
    this.computeBonusEquipements();
  }

  computeBonusEquipements() {
    this.equipements.def = 0;
    this.equipements.atk = 0;
    for (let armor in this.equipements.armor) {
      this.equipements.def += this.equipements.armor[armor].def;
      this.equipements.atk += this.equipements.armor[armor].atk;
    }
    for (let weapon in this.equipements.armor) {
      this.equipements.def += this.equipements.armor[weapon].def;
      this.equipements.atk += this.equipements.armor[weapon].atk;
    }
  }

  setUtilityInfo(color) {
    this.utility = {};
    this.utility.color = color;
  }

  canEquip(equipement) {}

  addEquipement(newE) {
    if (this.canEquip(newE)) {
      this.equipements[newE.type][newE.equipementType] = newE;
      this.computeBonusEquipements();
    }
  }

  setStatBase(stats) {
    this.stats = {};
    for (let stat in stats) {
      this.stats[stat] = {
        value: stats[stat],
        mod: Entity.getModifier(stats[stat]),
      };
    }
  }

  isHit(atk) {
    return atk >= this.attr.ac.total;
  }

  loseHP(toLose) {
    this.attr.hp.actual -= toLose;
    return `${this.name} lost ${toLose} HP`;
  }

  static getFunctionFromExpression(args, expression) {
    return Function(args, '"use strict"; return ' + expression);
  }

  static getModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  static readJsonFile(filepath) {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
}

module.exports = Entity;
