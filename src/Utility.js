'use strict';

function roll(i) {
  return Math.round(Math.random() * (i - 1) + 1);
}

module.exports = { roll };
