
const fs = require('fs');

const log = require('./log')
const git = require('./git')

const dataDir = process.env.HOME + '/.todo'
const todoFile = dataDir + '/todo.md'
const doneFile = dataDir + '/done.md'

async function init (url) {
  // continue only if git is installed
  await git.installed()

  // clone a gist
  await git.clone(url, dataDir)

  // create files
  await Promise.all([createFile(todoFile), createFile(doneFile)])

  // commit and push
  await git.update(dataDir, 'initial commit')
}

function pending () {
  log.o(arguments.callee.name)
}

function list () {
  log.o(arguments.callee.name)
}

function add (todo) {
  log.o(arguments.callee.name + todo)
}

function done (id, ids) {
  log.o(arguments.callee.name)
}

async function createFile (path) {
  await fs.open(path, 'w', function (err, file) {
    if (err) throw err
  })
}

module.exports = {
  init: init,
  pending: pending,
  list: list,
  add: add,
  done: done
}
