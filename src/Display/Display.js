'use strict';

const { MessageEmbed } = require('discord.js');
const { repeatString } = require('../Utility');

function baseEmbed() {
  let embed = new MessageEmbed();
  embed.setTimestamp();
  return embed;
}

function createDescription(elements) {
  return '```dsconfig\n' + elements.join(' | ') + '\n```';
}

function adjustNumberDisplay(n, maxSpace = 2) {
  let spaceTaken = 0;
  let res = n + '';
  if (n < 0) {
    spaceTaken += 1;
    n = -n;
  }
  spaceTaken += Math.max(1, Math.floor(Math.log10(n) + 1));
  res = repeatString(' ', maxSpace - spaceTaken) + res;
  return res;
}

function adjustStringDisplay(s, maxSpace = 6) {
  const delta = Math.max(maxSpace - s.length, 0);
  s += repeatString(' ', delta);
  return s;
}

function formatStatsToString(stats, statName) {
  return `${statName}: ${adjustNumberDisplay(
    stats[statName].value
  )} > ${adjustNumberDisplay(stats[statName].mod)}`;
}

function formatAttributsToString(attrs, attrName) {
  const spaceNb = 4;
  if (attrName === 'ac') {
    return `${adjustStringDisplay(attrName, spaceNb)}: ${adjustNumberDisplay(
      attrs[attrName].total,
      3
    )}`;
  } else {
    return `${adjustStringDisplay(attrName, spaceNb)}: ${adjustNumberDisplay(
      attrs[attrName],
      3
    )}`;
  }
}

function createField(elements, format, inline, keys = Object.keys(elements)) {
  let value = '```yaml\n';
  let i = 0;
  for (let element of keys) {
    if (i !== 0) {
      if (inline && i % 2 === 1) {
        value += '  |  ';
      } else {
        value += '\n';
      }
    }
    let res = format(elements, element);
    if (res !== '') {
      value += res;
      i++;
    }
  }
  value += '```';
  return value;
}

function createFieldStats(stats) {
  return createField(stats, formatStatsToString, true);
}

function createFieldAttributs(attrs) {
  return createField(attrs, formatAttributsToString, true, [
    'bba',
    'init',
    'cac',
    'dist',
    'ac',
  ]);
}

function getDiffHPModifier(hp) {
  if (hp.actual > hp.max) {
    return '+';
  } else if (hp.actual < hp.max) {
    return '-';
  } else {
    return ' ';
  }
}

function createFieldHP(attrs) {
  let res = '```diff\n';
  res += `  ${adjustStringDisplay('MAX HP', 8)}: ${adjustNumberDisplay(
    attrs.hp.max,
    Math.log10(attrs.hp.max)
  )}  |  DV: ${attrs.dv}`;
  res += '\n';
  res += `${getDiffHPModifier(attrs.hp)} ${adjustStringDisplay(
    'HP',
    8
  )}: ${adjustNumberDisplay(attrs.hp.actual, Math.log10(attrs.hp.max))}`;
  res += '\n```';
  return res;
}

function displayEntity(entity) {
  let embed = baseEmbed();
  embed.setTitle(entity.name);
  embed.setDescription(
    createDescription([entity.race, 'Level: ' + entity.level])
  );
  embed.addField('HP', createFieldHP(entity.attr));
  embed.addField('Stats', createFieldStats(entity.stats));
  embed.addField('Attributs', createFieldAttributs(entity.attr));
  embed.setFooter(`Taille: ${entity.size.size}`);
  embed.setColor(entity.constructor.getDiscordColor());
  return embed;
}

module.exports = { displayEntity };
