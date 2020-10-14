'use strict';

const Stats = require('../Stats');
const Monster = require('./Monster');

const gaussian = require('gaussian');

class Goblin extends Monster {
  constructor(level) {
    // level, size, grade, location
    super(level, 'P', 1, 'Dungeon');
  }

  setStatBase() {
    const distrib = gaussian(10, 3);
    this.stats = {};
    for (let stat of Stats) {
      const randStat = distrib.ppf(Math.random());
      this.stats[stat] = { value: Math.round(randStat) };
    }
    this.stats.dex.value += 2;
    this.stats.wis.value -= 1;
    this.stats.cha.value -= 3;
    for (let stat of Stats) {
      const randStat = distrib.ppf(Math.random());
      this.stats[stat].mod = Goblin.getModifier(randStat);
    }
  }
}

module.exports = Goblin;
