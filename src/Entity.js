'use strict';

const Stats = require('./Stats');
const Size = require('./Size');

class Entity {
  constructor(level, size) {
    this.level = level;
    this.size = size;
    this.setStatBase();
    this.setEquipement();
    this.setAttributs();
    this.computeAttributs();
  }

  setAttributs() {
    this.attr = {};
    this.attr.dv = 10;
  }

  computeAttributs() {
    this.attr.pv = (this.attr.dv + this.stats.con.mod) * this.level;
    this.attr.ac = {};
    this.attr.ac.base = 10;
    this.attr.ac.armor = 0;
    for (let equip in this.equipements) {
      this.attr.ac.armor += equip.def;
    }
    this.attr.ac.total =
      this.attr.ac.armor +
      this.attr.ac.base +
      this.stats.dex.mod +
      Size[this.size].ac;
  }

  setEquipement() {
    this.equipements = {};
  }

  setStatBase() {
    this.stats = {};
    for (let stat of Stats) {
      this.stats[stat] = { value: 10, mod: 0 };
    }
  }

  static getModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }
}

module.exports = Entity;
