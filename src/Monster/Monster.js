'use strict';

const Entity = require('../Entity');

class Monster extends Entity {
  constructor(level, size, grade, location) {
    super(level, size);
    this.grade = grade;
    this.location = location;
  }
}

module.exports = Monster;
