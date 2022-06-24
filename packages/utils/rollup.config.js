import typescript from '@rollup/plugin-typescript'
import bundleSize from 'rollup-plugin-bundle-size'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'browser.js',
    format: 'umd',
    name: 'JsonqlUtils',
    plugins: [terser()]
  }, {
    file: 'tests/qunit/webroot/jsonql-utils.js',
    format: 'umd',
    name: 'JsonqlUtils'
  }],
  plugins: [
    typescript({
      compilerOptions: {
        module: 'esnext',
        target: 'es6'
      }
    }),
    bundleSize()
  ]
}
