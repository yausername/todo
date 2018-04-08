const { exec } = require('child_process')

function installed () {
  // check if git is installed
  exec('got --version', (error, stdout, stderr) => {
    if (error) {
      console.error(`git is not installed or not available in path: ${error}`)
    }
  })
}

module.exports = {
  installed: installed
}
