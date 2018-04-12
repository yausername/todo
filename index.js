#!/usr/bin/env node

require('dotenv').config()

const program = require('commander')
const log = require('./log')
const todo = require('./todo')

program
  .version('0.1.0')
  .description('awesome todo list cli')

program
  .option('-v, --verbose', 'verbose logging')

program.on('option:verbose', function () {
  process.env.VERBOSE = this.verbose
})

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

program
  .on('command:*', function () {
    log.e('Invalid command: %s\nSee --help for a list of available commands.',
      program.args.join(' '))
    process.exit(1)
  })

program.parse(process.argv)

if (!program.args.length) {
  todo.pending()
}
