// turn the js into JSON for other language to use
// @2.0.0 we split in files into sections
const fsx = require('fs-extra')
const { join } = require('path')
const files = [
  'base.js',
  'prop.js',
  'socket.js',
  'validation.js'
]
const importFn = require('./import')
// just concat the file together as on for index.js 
// keep getting prop not export by file error by rollup 
const indexOutput = files.map(file => (
  `/* ${file} */\n\n` + fsx.readFileSync(join(__dirname, file), { encoding: 'utf8'})
)).reduce((a, b) => a + '\r' + b, '')

let readme = '\n'

const allProps = files.map(file => {

  let props = importFn(join(__dirname, file))

  // create README output
  readme += `### ${file.replace('.js', '').toUpperCase()}\n\n`
  readme += Object.keys(props).map(prop => `- ${prop}\n`)
  readme += '\n'

  return props 
}).reduce((a, b) => Object.assign(a, b), {})
// dirty hack to fix the extra character 
readme = readme.replace(/\,\-/g, '-')

const strJson = `${JSON.stringify(allProps, null, 4)}`

const cjs = `module.exports = ${strJson}`
const browser = `var jsonqlConstants = ${strJson}`

// output to index 
fsx.outputFileSync(join(__dirname, 'index.js'), indexOutput)
// output to README
const tpl = fsx.readFileSync(join(__dirname, 'README_TEMPLATE.md'))
const content = tpl.toString().replace('[REPLACE]', readme)
fsx.outputFileSync(join(__dirname, 'README.md'), content)
// out put the cjs main.js  
fsx.outputFileSync(join(__dirname, 'main.js'), cjs)
// output to browser.js 
fsx.outputFileSync(join(__dirname, 'browser.js'), browser)
// output to constants.json 
fsx.outputJson(join(__dirname, 'constants.json'), allProps, { spaces: 2 }, err => {
  if (err) {
    console.log('ERROR:', err)
    process.exit()
    return
  }

  console.log('[ contants.json generated ]')
})
