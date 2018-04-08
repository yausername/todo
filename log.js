const util = require('util')
const chalk = require('chalk')

const out = console.log

function err () {
  console.error(chalk.red('error: %s'), util.format.apply(util,arguments))
}

module.exports = {
  o: out,
  e: err
}
