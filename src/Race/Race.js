'use strict';

const { Stats } = require('../Stats');
const { readJsonFile } = require('../Utility');

class Race {
  constructor(racePath) {
    const race = readJsonFile(racePath);
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
