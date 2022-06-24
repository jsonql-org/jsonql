import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'browser.js',
    sourcemap: true,
    format: 'umd',
    name: 'JsonqlUtils'
  }, {
    file: 'tests/qunit/webroot/jsonql-utils.js',
    sourcemap: false,
    format: 'umd',
    name: 'JsonqlUtils'
  }],
  plugins: [typescript()]
}
