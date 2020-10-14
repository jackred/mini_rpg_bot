'use strict';

const Stats = ['str', 'int', 'cha', 'dex', 'wis', 'con'];
const DefaultStats = Object.fromEntries(Stats.map((d) => [d, 10]));

module.exports = { Stats, DefaultStats };
