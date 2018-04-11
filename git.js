const { promisify } = require('util')
const { exec } = require('child_process')
const execPromise = promisify(exec)
const log = require('./log')

/**
 * check if git is installed
 *
 */
async function installed () {
  try {
    const output = await execPromise('git --version')
    return output
  } catch (error) {
    log.e(`git is not installed or not available in path: ${error}`)
    process.exit(1)
  }
}

async function clone (url, dir) {
  try {
    const output = await execPromise(`git clone ${url} ${dir}`)
    return output
  } catch (error) {
    log.e(`git clone failed: ${error}`)
    process.exit(1)
  }
}

async function update (dir, message) {
  try {
    const output = await execPromise(`cd ${dir} && git add -A && git commit -am "${message}" && git push origin master`)
    return output
  } catch (error) {
    log.e(`git commit/push failed: ${error}`)
    process.exit(1)
  }
}

module.exports = {
  installed: installed,
  clone: clone,
  update: update

}
