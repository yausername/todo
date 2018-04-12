
const fs = require('fs')

const log = require('./log')
const git = require('./git')

const dataDir = process.env.HOME + '/.todo'
const todoFile = dataDir + '/todo.md'
const doneFile = dataDir + '/done.md'

async function init (url) {
  // continue only if git is installed
  log.o('verifing if git is installed')
  await git.installed()

  // clone a gist
  log.o(`cloning the gist in ${dataDir}`)
  await git.clone(url, dataDir)

  // create files
  log.o('creating todo files')
  await Promise.all([createFile(todoFile), createFile(doneFile)])

  // commit and push
  log.o('pushing updates to remote')
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
