#!/usr/bin/env node

const version = require('./package.json').version
const program = require('commander')

const log = require('./log')
const todo = require('./todo')

program
  .version(version)
  .description('awesome todo list cli')

// verbose mode prints debug logs
// quiet mode disables info logs
program
  .option('-v, --verbose', 'verbose mode')
  .option('-q, --quiet', 'quiet mode')

program.on('option:verbose', function () {
  process.env.VERBOSE = this.verbose
})

program.on('option:quiet', function () {
  process.env.QUIET = this.quiet
})

// initialize the app with a gist
program
  .command('init <url>')
  .alias('i')
  .description('initialize with a gist from github')
  .action((url) => {
    todo.init(url)
  })

// list all todos
program
  .command('list')
  .alias('l')
  .description('list all todos')
  .action(() => {
    todo.listAll()
  })

// add a todo
program
  .command('add <todo>')
  .alias('a')
  .description('add a todo')
  .action((message) => {
    if (!message.trim()) {
      log.e('todo should not be empty')
      process.exit(1)
    }
    todo.add(message.trim())
  })

// mark todos as done
program
  .command('done <id> [ids...]')
  .alias('d')
  .description('mark as done')
  .action((id, ids) => {
    todo.done(id, ids)
  })

// fetch updates from remote gist
program
  .command('update')
  .alias('u')
  .description('fetch updates from remote gist (git pull)')
  .action(() => {
    todo.update()
  })

// error on unknown commands
program
  .on('command:*', function () {
    log.e('Invalid command: %s\nSee --help for a list of available commands.',
      program.args.join(' '))
    process.exit(1)
  })

program.parse(process.argv)

// show pending todos when no subcommand is executed
if (!program.args.length) {
  todo.listPending()
}
