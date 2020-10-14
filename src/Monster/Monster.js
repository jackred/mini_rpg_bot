'use strict';

const Entity = require('../Entity');

class Monster extends Entity {
  constructor(level, size, grade, location, { dv, acBase, bba, stats } = {}) {
    super(level, size, { dv, acBase, bba, stats });
    this.grade = grade;
    this.location = location;
  }
}

module.exports = Monster;
