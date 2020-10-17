'use strict';

const { getDefaultStats } = require('./Stats');
const Size = require('./Size');

class Entity {
  constructor(level, size, name, stats = getDefaultStats()) {
    this.race = this.constructor.name;
    this.name = name;
    this.level = level;
    this.size = { size, ...Size[size] };
    this.setStatBase(stats);
    this.setEquipement();
    this.setAttributs();
    this.computeAttributs();
  }

  setAttributs() {
    this.attr = {};
    this.attr.dv = this.constructor.getDV(this.level);
    this.attr.ac = {};
    this.attr.ac.base = this.constructor.getAcBase();
  }

  computeAttributs() {
    this.attr.bba = this.constructor.getBBA(this.level);
    const tmp = this.attr.dv + this.stats.con.mod;
    this.attr.hp = {
      max: tmp * this.level,
      actual:
        this.attr.hp !== undefined ? this.hp.actual + tmp : tmp * this.level,
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

  setEquipement() {
    this.equipements = {};
    this.equipements.atk = 0;
    this.equipements.def = 0;
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

  static getModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  static getBBA(level) {
    return level;
  }

  static getDV() {
    return 10;
  }

  static getAcBase() {
    return 10;
  }

  static getStatsModRace() {
    return {};
  }

  static getDiscordColor() {
    return '#FFFFFF';
  }
}

module.exports = Entity;
