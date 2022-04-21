// after running the tsc, we stitch togehter all the files
// and dump them into the index.d.ts
const fsx = require('fs-extra')
const { join } = require('path')

const targets = ['ast', 'base', 'prop', 'socket', 'validation']
Promise.all(
  targets.map(target => {
    return fsx.readFile(join(__dirname, 'dist', `${target}.d.mts`))
  })
).then(results => {
  let content = results.reduce((a, b) => {
    return a.toString() + '\n' + b.toString()
  }, Buffer.from(`declare module "@jsonql/constants" {`))
  content += `\n}\n`

  return content
}).then(content => {

  return fsx.outputFile(join(__dirname, 'index.d.ts'), content)
}).then(() => {
  console.log(`index.d.ts generated`)
}).catch(e => {
  console.error(`Something weng wrong`, e)
})
