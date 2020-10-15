'use strict';

const Stats = ['str', 'int', 'cha', 'dex', 'wis', 'con'];
function getDefaultStats() {
  return Object.fromEntries(Stats.map((d) => [d, 10]));
}

module.exports = { Stats, getDefaultStats };
