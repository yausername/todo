
const { log } = require('./log')

function init () {
  log.info(arguments.callee.name)
}

function pending () {
  log.info(arguments.callee.name)
}

function list () {
  log.info(arguments.callee.name)
}

function add (todo) {
  log.info(arguments.callee.name)
}

function done (id, ids) {
  log.info(arguments.callee.name)
}

module.exports = {
  init: init,
  pending: pending,
  list: list,
  add: add,
  done: done
}
