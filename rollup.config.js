const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const pkg = require('./package.json');

const dependencies = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
];
;

module.exports = {
  input: 'src/index.js',
  external: id =>
    dependencies.some(
      dep => id === dep || id.startsWith(`${dep}/`)
    ),
  output: [
    { file: 'lib/index.js', format: 'cjs', exports: 'named' },
    { file: 'es/index.js', format: 'es' },
    {
      file: 'umd/index.js',
      format: 'umd',
      name: 'ExternalText',
      globals: {
        react: 'React',
        lodash: '_',
        'prop-types': 'PropTypes'
      }
    }
  ],
  plugins: [
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    nodeResolve({ browser: true }),
    json(),
    commonjs()
  ]
};
