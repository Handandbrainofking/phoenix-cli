'use strict';

const { log } = require('@phoenix/utils');
function cli(args) {
  // TODO
  console.log(args);
  log.info('cli', 'hello');
}

module.exports = cli;
