'use strict';

const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const userHome = require('user-home');
const pathExists = require('path-exists').sync;
const commander = require('commander');

const pkg = require('../package.json');

const program = new commander.Command();

const { log } = require('@phoenix-fe/utils');

async function cli(args) {
  // TODO
  console.log('args', args);
  log.info('cli', 'hello');
  try {
    await prepare();
    registerCommand();
  } catch (error) {
    log.error(e.message);
    console.log(error);
  }
}

async function prepare() {
  log.notice('cli', 'start prepare');
  log.verbose('prepare');
}
function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false);

  program
    .command('init [projectName]')
    .option('-f, --force', '是否强制初始化项目');

  program.on('option:debug', function () {
    console.log(program.debug);
    if (program.debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
    console.log(log.level);
    log.verbose('print debug');
  });
  program.on('command:*', function (obj) {
    const availableCommands = program.commands.map((cmd) => cmd.name());
    console.log(colors.red('无效命令：' + obj[0]));
    if (availableCommands.length > 0) {
      console.log(colors.red('可用的命令：' + availableCommands.join(',')));
    }
  });
  program.parse(process.argv);
    console.log(program);
  if (program.args && program.args.length < 1) {
    program.outputHelp();
    console.log();
  }
}

module.exports = cli;
