import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/ytp.js',
      format: 'umd',
      extend: true,
      name: "YTP",
    },
    plugins: [
      typescript(),
      commonjs()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/ytp.min.js',
      format: 'umd',
      extend: true,
      name: "YTP",
    },
    plugins: [
      typescript(),
      commonjs(),
      uglify()
    ]
  }
]