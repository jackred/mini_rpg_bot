'use strict';

const { Stats, DefaultStats } = require('./Stats');
const Size = require('./Size');

class Entity {
  constructor(
    level,
    size,
    {
      dv = 10,
      acBase = 10,
      bba = 0,
      statsModRace = {},
      stats = Object.assign({}, DefaultStats),
    } = {}
  ) {
    this.level = level;
    this.size = Size[size];
    this.setStatBase(stats, statsModRace);
    this.setEquipement();
    this.setAttributs(dv, acBase, bba);
    this.computeAttributs();
  }

  setAttributs(dv, acBase, bba) {
    this.attr = {};
    this.attr.dv = dv;
    this.attr.ac = {};
    this.attr.ac.base = acBase;
    this.attr.bba = bba;
  }

  computeAttributs() {
    this.attr.pv = (this.attr.dv + this.stats.con.mod) * this.level;
    this.attr.ac.armor = 0;
    for (let equip in this.equipements) {
      this.attr.ac.armor += equip.def;
    }
    this.attr.ac.total =
      this.attr.ac.armor +
      this.attr.ac.base +
      this.stats.dex.mod +
      this.size.mod;
    this.attr.bbc = this.attr.bba + this.stats.str.mod + this.size.mod;
  }

  setEquipement() {
    this.equipements = {};
  }

  setStatBase(stats, statsModRace) {
    this.stats = {};
    for (let stat in stats) {
      const tmp = stats[stat] + (statsModRace[stat] || 0);
      this.stats[stat] = {
        value: tmp,
        mod: Entity.getModifier(tmp),
      };
    }
  }

  static getModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }
}

module.exports = Entity;
