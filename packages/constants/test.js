// very simple diy test the variable exports 
const { join } = require('path')
const importFn = require('./import')

const props = importFn(join(__dirname, 'index.js'))


console.info(props)



