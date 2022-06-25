// need to use rollup to build because ESM just lack of format for our use
import commonJs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import bundleSize from 'rollup-plugin-bundle-size'
import polyfill from 'rollup-plugin-polyfill-node'
// import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'tests/qunit/webroot/lib/jsonql-validator-core.lib.js',
    format: 'umd',
    name: 'JsonqlValidatorCore',
    globals: ['tty', 'util', 'os']
  }],
  plugins: [
    commonJs(),
    nodeResolve(),
    polyfill(),
    typescript({
      compilerOptions: {
        module: 'esnext',
        target: 'es6'
      }
    }),
    bundleSize()
  ]
}
