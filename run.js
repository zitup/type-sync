const fs = require('fs')
const path = require('path')

/**
 * if use npm
 */
const { npm_execpath } = process.env

// create .hooks/postinstall file
if (npm_execpath.indexOf('npm') > -1) {

  const hooks_path = path.resolve(__dirname, '../.hooks')
  if (!fs.existsSync(hooks_path)) {
    fs.mkdirSync(hooks_path)
    fs.linkSync('index.js', path.resolve(hooks_path, 'postinstall'))
  }
}
