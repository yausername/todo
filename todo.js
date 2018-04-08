
const log = require('./log')

function init () {
  log.o(arguments.callee.name)
}

function pending () {
  log.o(arguments.callee.name)
}

function list () {
  log.o(arguments.callee.name)
}

function add (todo) {
  log.o(arguments.callee.name)
}

function done (id, ids) {
  log.o(arguments.callee.name)
}

module.exports = {
  init: init,
  pending: pending,
  list: list,
  add: add,
  done: done
}
