import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import typescript from '@rollup/plugin-typescript'
import nodePolyfills from 'rollup-plugin-polyfill-node'
// import externalGlobals from "rollup-plugin-external-globals";
const packageJson = require('./package.json')
const extensions = ['.js', '.ts']
const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: './src/index.ts',
  output: [
    {
      name: packageJson.name,
      format: 'umd',
      file: `dist/${packageJson.name}.js`,
      sourcemap: !isProduction,
      globals: {
        react: 'React',
        'react-dom/server': 'ReactDOMServer',
        'react-dom': 'ReactDOM'
      }
    },
    {
      file: `dist/${packageJson.name}.min.js`,
      format: 'umd',
      name: packageJson.name,
      sourcemap: !isProduction,
      globals: {
        react: 'React',
        'react-dom/server': 'ReactDOMServer',
        'react-dom': 'ReactDOM'
      }
    },

    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: !isProduction,
      globals: {
        react: 'React',
        'react-dom/server': 'ReactDOMServer',
        'react-dom': 'ReactDOM'
      }
    }
  ],
  plugins: [
    typescript({ declaration: false, module: 'esnext', sourceMap: !isProduction }),
    resolve({ extensions, browser: true, jsnext: true, main: true }),
    commonjs(),
    terser({
      ecma: 2020,
      mangle: { toplevel: true },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: !isProduction,
        drop_debugger: !isProduction
      },
      output: { quote_style: 1 }
    }),
    filesize(),
    nodePolyfills({ include: 'src' }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  external: [
    'react-dom/server',
    'react-dom',
    'react'
  ]
}
