const Goblin = require('./Monster/Goblin');
const Fighter = require('./Class/Fighter');
const Elf = require('./Race/Elf');
const { getDefaultStats } = require('./Stats');

let gobo = new Goblin(1, 'Gobo');
let guard = new Fighter(1, Elf, 'Jonh', getDefaultStats());
