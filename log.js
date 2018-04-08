'use strict'

const winston = require('winston')
const makeDir = require('make-dir')

/**
 * createLogDir
 *   OS X - '/Users/user/Library/Preferences/node-todo'
 *   Windows 8,10 - 'C:\Users\User\AppData\Roaming\node-todo'
 *   Windows XP - 'C:\Documents and Settings\User\Application Datai\node-todo'
 *   Linux - '~/.local/share/node-todo'
 *
 * @returns {string}
 */
function createLogDir () {
  const logDir = (process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME +
    '/Library/Preferences' : process.env.HOME + '/.local/share')) + '/node-todo'

  return makeDir.sync(logDir)
}

const logDir = createLogDir()

const logFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

const errorFileTransport = new winston.transports.File({
  filename: logDir + '/error.log',
  level: 'error',
  maxsize: 10000000,
  maxFiles: 10
})

const combinedFileTransport = new winston.transports.File({
  filename: logDir + '/combined.log',
  maxsize: 10000000,
  maxFiles: 10
})

const consoleTransport = new winston.transports.Console()

const transports = [errorFileTransport, combinedFileTransport]

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.timestamp(),
    logFormat
  ),
  transports: transports
})

function enableConsole () {
  logger.add(consoleTransport)
}

module.exports = {
  log: logger,
  verbose: enableConsole
}
