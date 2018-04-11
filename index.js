#!/usr/bin/env node

require('dotenv').config()

const program = require('commander')
const log = require('./log')
const todo = require('./todo')

program
  .version('0.1.0')
  .description('awesome todo list cli')

program
  .command('init <url>')
  .alias('i')
  .description('initialize with a gist from github')
  .action((url) => {
    todo.init(url)
  })

program
  .command('list')
  .alias('l')
  .description('list all todos')
  .action(() => {
    todo.list()
  })

program
  .command('add <todo>')
  .alias('a')
  .description('add a todo')
  .action((message) => {
    todo.add(message)
  })

program
  .command('done <id> [ids...]')
  .alias('d')
  .description('mark as done')
  .action((id, ids) => {
    todo.done(id, ids)
  })

program.parse(process.argv)

if (!program.args.length) {
  todo.pending()
} else if (!program.args.find(cmd => typeof cmd === 'object')) {
  // if no command was executed
  unknownCmd()
}

function unknownCmd () {
  log.e('Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' '))
  process.exit(1)
}
