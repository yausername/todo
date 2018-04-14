const { promisify } = require('util')
const { exec, spawn } = require('child_process')
const execPromise = promisify(exec)
const log = require('./log')

/**
 * check if git is installed
 *
 * @returns output
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

/**
 * clone a gist
 *
 * @param url
 * @param dir
 * @returns output
 */
async function clone (url, dir) {
  try {
    const output = await execPromise(`git clone ${url} ${dir}`)
    return output
  } catch (error) {
    log.e(`git clone failed: ${error}`)
    process.exit(1)
  }
}

/**
 * commit files and push
 *
 * @param dir
 * @param message
 * @returns output
 */
async function update (dir, message) {
  try {
    const output = await execPromise(`cd ${dir} && git add -A && (git diff-index --quiet HEAD || git commit -m "${message}") && git push origin master`)
    return output
  } catch (error) {
    log.e(`git commit/push failed: ${error}`)
    process.exit(1)
  }
}

/**
 * commit files and push in a background process
 *
 * @param dir
 * @param message
 */
function updateBackgound (dir, message) {
  const subprocess = spawn('/bin/sh', ['-c', `cd ${dir} && git add -A && (git diff-index --quiet HEAD || git commit -m "${message}") && git push origin master`], {
    detached: true,
    stdio: 'ignore'
  })

  subprocess.unref()
}

/**
 * git pull
 *
 * @param dir
 * @returns output
 */
async function pull (dir) {
  try {
    const output = await execPromise(`cd ${dir} && git pull`)
    return output
  } catch (error) {
    log.e(`git pull failed: ${error}`)
    process.exit(1)
  }
}

module.exports = {
  installed: installed,
  clone: clone,
  update: update,
  updateBackgound: updateBackgound,
  pull: pull

}
