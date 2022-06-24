// need to use rollup to build because ESM just lack of format for our use
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
    file: 'tests/qunit/webroot/lib/jsonql-validator-core.lib.js',
    format: 'umd',
    name: 'JsonqlValidatorCore'
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
