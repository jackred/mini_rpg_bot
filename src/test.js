const Goblin = require('./Monster/Goblin');
const Fighter = require('./Class/Fighter');
const Elf = require('./Race/Elf');
const { getDefaultStats } = require('./Stats');
const { displayEntity } = require('./Display/Display');

const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.on('ready', () => {
  console.log('Starting!');
});

client.login(config.token);

let gobo = new Goblin(1, 'Gobo');
let guard = new Fighter(1, Elf, 'Jonh', getDefaultStats());
