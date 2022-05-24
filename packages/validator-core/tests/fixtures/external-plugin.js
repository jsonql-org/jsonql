// create a external plugin and import into the ValidatorPlugins

const name = 'myCustomPlugin'

function main(value) {
  return value.indexOf('Hello') > -1
}

export default {
  name,
  main,
  params: []
}
