/* globals __dirname */
module.exports = function() {
  var cucumberStep = this;
  var cukedZombie = require('cuked-zombie');
  var chai = require('chai');

  var commons = {};
  var infected = cukedZombie.infect(cucumberStep, {
    world: require('../world-config'),
    steps: {
      arguments: [chai.expect, commons],
      dir: __dirname
    }
  });
};