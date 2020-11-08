'use strict';

const Monster = require('./Monster');
const path = require('path');

class Goblin extends Monster {
  constructor(level, name, { stats = {}, equipements = {} } = {}) {
    super(path.resolve(__dirname, './Goblin.json'), level, name, {
      equipements,
      stats,
    });
  }
}

module.exports = Goblin;
