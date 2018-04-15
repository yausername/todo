# todo

[![NPM](https://nodei.co/npm/todo-gist-cli.png)](https://www.npmjs.com/package/todo-gist-cli)   [![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)   [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/yausername/todo/issues)

## Installation

    sudo npm i todo-gist-cli -g

## Usage

    Usage: todo [options] [command]

    awesome todo list cli

    Options:

      -V, --version         output the version number
      -v, --verbose         verbose mode
      -q, --quiet           quiet mode
      -h, --help            output usage information

    Commands:

      init|i <url>          initialize with a gist from github
      list|l                list all todos
      add|a <todo>          add a todo
      done|d <id> [ids...]  mark as done
      update|u              fetch updates from remote gist (git pull)
      
## Exmaples
     
      # initialize with a gist (git should be working with ssh)
      # create a secret gist at https://gist.github.com/. Below is an example
      todo i git@gist.github.com:13e1eb14f566f48be66d57ecbf99767d.git
      
      # add todos
      todo a "go to gym"
      todo a "eat pizza"
      todo a "eat burger"
      
      # mark todos as done
      todo d 2 3
      
      # see pending todos
      todo
      
      # see help
      todo -h
