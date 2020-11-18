'use strict';

const { getDefaultStats } = require('./Stats');
const listEquipement = require('./Equipement/ListEquipement.json');
const Size = require('./Size');
const { isEmpty } = require('./Utility');

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
    { equipements = [], stats = getDefaultStats() } = {}
  ) {
    // put in function
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

  initEquipement() {
    this.equipements = {};
    for (let type of listEquipement.equipementType) {
      this.equipements[type] = {};
    }
  }

  initProperty() {
    this.attr = {};
    this.attr.ac = {};
    this.attr.hp = {};
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

  setEquipement(equipements = []) {
    this.initEquipement();
    for (let e of equipements) {
      this.equipements[e.type][e.equipementType] = e;
    }
    this.computeBonusEquipements();
  }

  computeBonusEquipements() {
    for (let type of listEquipement.equipementType) {
      for (let equipement in this.equipements[type]) {
        let tmpE = this.equipements[type][equipement];
        for (let bonus in tmpE.bonus) {
          if (!(bonus in this.equipements)) {
            this.equipements[bonus] = 0;
          }
          this.equipements[bonus] += tmpE.bonus[bonus];
        }
      }
    }
  }

  setUtilityInfo(color) {
    this.utility = {};
    this.utility.color = color;
  }

  canEquip(userType) {
    return listEquipement.userType[userType].includes(this.race);
  }

  hasEquipementType(type, equipementType) {
    return equipementType in this.equipements[type];
  }

  addEquipement(newE) {
    let msg;
    if (this.canEquip(newE.userType)) {
      if (!this.hasEquipementType(newE.type, newE.equipementType)) {
        this.equipements[newE.type][newE.equipementType] = newE;
        this.computeBonusEquipements();
        msg = { res: true, msg: `${newE.name} is now equipped` };
      } else {
        msg = {
          res: false,
          msg: `An equipement ${newE.equipementType} is already equipemd`,
        };
      }
    } else {
      msg = { res: false, msg: `Can't equip ${newE.userType} equipement` };
    }
    return msg;
  }

  setStatBase(stats) {
    this.stats = {};
    let defaultStats = getDefaultStats();
    for (let stat in defaultStats) {
      if (!(stat in stats)) {
        stats[stat] = defaultStats[stat];
      }
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
}

module.exports = Entity;
