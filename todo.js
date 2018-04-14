
const fs = require('fs')
const chalk = require('chalk')

const log = require('./log')
const git = require('./git')

const dataDir = process.env.HOME + '/.todo'
const todoFile = dataDir + '/todo.md'
const doneFile = dataDir + '/done.md'

// init app with gist
async function init (url) {
  // continue only if git is installed
  log.o('verifing if git is installed')
  const out1 = await git.installed()
  log.d(out1)

  // clone a gist
  log.o(`cloning the gist in ${dataDir}`)
  const out2 = await git.clone(url, dataDir)
  log.d(out2)

  // create files
  log.o('creating todo files')
  const out3 = await Promise.all([createFile(todoFile), createFile(doneFile)])
  log.d(out3)

  // commit and push
  log.o('pushing updates to remote')
  const out4 = await git.update(dataDir, 'initial commit')
  log.d(out4)
}

// list todos
function listPending () {
  // read todos from file
  const data = fs.readFileSync(todoFile, 'utf8')

  console.log('todos -')

  // print todos on console
  data
    .split('\n')
    .filter(d => d)
    // remove markdown syntax before printing
    .map(d => d.replace('* ', ''))
    .map((d, i) => console.log(chalk.green('    ' + (i + 1) + '. ' + d)))
}

// list done
function listDone () {
  // read done from file
  const data = fs.readFileSync(doneFile, 'utf8')

  console.log('done -')

  // print done on console
  data
    .split('\n')
    .filter(d => d)
    // remove markdown syntax before printing
    .map(d => d.replace(/^\* ~~|~~$/g, ''))
    .map((d, i) => console.log(chalk.red('    ' + (i + 1) + '. ' + chalk.strikethrough(d))))
}

// list all todos
function listAll () {
  // list pending todos
  listPending()

  // list done
  listDone()
}

// add a todo
async function add (todo) {
  // add todo to file
  fs.appendFileSync(todoFile, '* ' + todo + '\n')

  // commit and push in background
  git.updateBackgound(dataDir, 'added a todo')

  // show todos
  listPending()
}

// mark as done
function done (id, ids) {
  // index of done
  const doneIds = ids.map(d => Number(d))
  doneIds.unshift(Number(id))

  // read todos from file
  const data = fs.readFileSync(todoFile, 'utf8')

  // filter out todos
  const updatedTodos = data
    .split('\n')
    .filter(d => d)
    .filter((d, i) => doneIds.indexOf(i + 1) === -1)

  // filter out done. add strikethrough for markdown
  const newDone = data
    .split('\n')
    .filter(d => d)
    .filter((d, i) => doneIds.indexOf(i + 1) !== -1)
    .map((d) => d.replace('* ', '* ~~'))
    .map((d) => d + '~~')

  // write to file and push updates in background
  if (newDone.length) {
    fs.writeFileSync(todoFile, updatedTodos.join('\n') + '\n')
    fs.appendFileSync(doneFile, newDone.join('\n') + '\n')
    git.updateBackgound(dataDir, 'marked as done')
  }

  // show todos
  listPending()
}

// pull updates from remote
async function update () {
  log.o('pulling updates from remote')
  const out = await git.pull(dataDir)
  log.d(out)
}

async function createFile (path) {
  await fs.open(path, 'a+', function (err, file) {
    if (err) throw err
  })
}

module.exports = {
  init: init,
  listPending: listPending,
  listAll: listAll,
  add: add,
  done: done,
  update: update
}
