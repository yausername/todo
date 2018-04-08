const { exec } = require('child_process')

const log = require('./log')

/**
 * check if git is installed
 *
 */
function installed () {
  exec('git --version', (error, stdout, stderr) => {
    if (error) {
      log.e(`git is not installed or not available in path: ${error}`)
      process.exit(1)
    }
  })
}

module.exports = {
  installed: installed
}
