const path = require('path');

const moduleResolver = require('babel-plugin-module-resolver');
const src = path.resolve(__dirname, 'src');

module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties', [
    moduleResolver,
    {
      root: src,
      alias: {
        '@': src,
        '@core': `${src}/core`,
      },
    }],
  ],
};
