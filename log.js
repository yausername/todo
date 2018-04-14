const util = require('util')
const chalk = require('chalk')

function info () {
  if (!process.env.QUIET) console.log('info: %s', util.format.apply(util, arguments))
}

function err () {
  console.error(chalk.red('error: %s'), util.format.apply(util, arguments))
}

function debug () {
  if (process.env.VERBOSE) console.log(chalk.yellow('debug: %s'), util.format.apply(util, arguments))
}

module.exports = {
  o: info,
  d: debug,
  e: err
}
