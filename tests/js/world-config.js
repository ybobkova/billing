/* globals __dirname */
var os = require('os');
var path = require('path');

module.exports = {
  cli: [__dirname, '..', '..', 'bin', 'cli.'+(os.platform() === 'win32' ? 'bat' : 'sh')].join(path.sep),
  domain: "clieman",
  debug: true
  /*
  cookies: [{
    name: 'staging_access',
    value: 'tokenU1V2pUK'
  }]
  */
}