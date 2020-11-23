const Goblin = require('./Monster/Goblin');
const Fighter = require('./Class/Fighter');
const Elf = require('./Race/Elf');
const { getDefaultStats } = require('./Stats');
const { displayEntity } = require('./Display/Display');
const Equipement = require('./Equipement/Equipement');

let sword = new Equipement({
  bonus: { str: 7, atk: 8, bba: 4 },
  name: 'Sword of Albion',
  size: 'M',
  type: 'weapon',
  equipementType: 'main',
  userType: 'humanoid',
});

let knife = new Equipement({
  bonus: { atk: 2 },
  name: 'Kitchen knife',
  size: 'M',
  type: 'weapon',
  equipementType: 'second',
  userType: 'humanoid',
});

let bow = new Equipement({
  bonus: { atk: 6, crit: 0.1 },
  name: 'Long bow of the ardent flame',
  size: 'M',
  type: 'weapon',
  equipementType: 'range',
  userType: 'humanoid',
});

let shield = new Equipement({
  bonus: { def: 4 },
  name: 'Sunrise shield',
  size: 'M',
  type: 'armor',
  equipementType: 'shield',
  userType: 'humanoid',
});

let gobo = new Goblin(1, 'Gobo');
let guard = new Fighter(1, 'Jonh', new Elf(), {
  stats: getDefaultStats(),
  equipements: [sword, shield, knife, bow],
});

console.log(gobo);
console.log(guard);

// const Discord = require('discord.js');
// const config = require('../config.json');

// const client = new Discord.Client({
//   partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
// });
// client.on('ready', () => {
//   console.log('Starting!');
// });

// client.login(config.token);
