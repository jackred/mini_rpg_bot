'use strict';

function roll(i) {
  return Math.round(Math.random() * (i - 1) + 1);
}

function repeatString(pattern, count) {
  if (count < 1) return '';
  let result = '';
  while (count > 1) {
    if (count & 1) result += pattern;
    (count >>= 1), (pattern += pattern);
  }
  return result + pattern;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

module.exports = { roll, repeatString, isEmpty };
