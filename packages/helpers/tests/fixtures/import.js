// testing the new ES6 dynamic import feature
const { join } = require('path')
// it doens't work natively yet so screw it @2019-09-02
import(join(__dirname, 'es6-fn.js'))
  .then(fn => {
    console.info(typeof fn)
    console.info(fn.toString())
    console.info(fn)
  })
