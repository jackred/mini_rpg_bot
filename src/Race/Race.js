'use strict';

const Entity = require('../Entity');
const { Stats } = require('../Stats');

class Race {
  constructor(racePath) {
    const race = Entity.readJsonFile(racePath, 'src/Race/');
    this.name = race.name;
    this.size = race.size;
    this.stat = race.stat;
  }
  getStat(values) {
    let res = {};
    for (let attr in this.stat) {
      if (attr === '*') {
        if (Stats.includes(values)) {
          res[values] = this.stat[attr];
        }
      } else {
        res[attr] = this.stat[attr];
      }
    }
    return res;
  }
}

module.exports = Race;
