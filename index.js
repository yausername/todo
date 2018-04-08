#!/usr/bin/env node

require('dotenv').config()

const program = require('commander')
const { verbose } = require('./log')
const todo = require('./todo')

program
  .version('0.1.0')
  .description('awesome todo list cli')

program
  .option('-v, --verbose', 'verbose logging', verbose)

program
  .command('init')
  .alias('i')
  .description('create an empty todo gist on github')
  .action(() => {
    todo.init()
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
} else if (!program.args.find(cmd => typeof cmd !== 'string')) {
  unknownCmd()
}

function unknownCmd () {
  console.error('Invalid command: "%s". See "--help" for a list of available commands.',
    program.args.join(' '))
  process.exit(1)
}
