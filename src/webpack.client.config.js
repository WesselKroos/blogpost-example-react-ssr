const path = require('path');
const webpack = require('webpack');

const clientConfig = DEVELOPMENT => {
  const sharedConfig = require('./webpack.shared.config.js')(DEVELOPMENT);
  return {
    entry: {
      'client.bundle': '../src/client'
    },
    target: 'web',
    output: {
      path: path.join(__dirname, '..', 'public/assets'),
      publicPath: 'assets/',
      hotUpdateChunkFilename: '__webpack-hmr/[hash].hot-update.js',
      hotUpdateMainFilename: '__webpack-hmr/[hash].hot-update.json'
    },
    module: {
      rules: [
        {
          test: sharedConfig.module.rules.js.test,
          exclude: sharedConfig.module.rules.js.exclude,
          use: [
            ...sharedConfig.module.rules.js.use,
            {
              loader: 'webpack-strip-block',
              options: {
                start: 'SERVERSIDE-ONLY:START',
                end: 'SERVERSIDE-ONLY:END'
              }
            }
          ]
        }
      ]
    },
    resolve: sharedConfig.resolve,
    externals: [
      DEVELOPMENT ? '' : 'webpack-hot-middleware/client?noInfo=true',
    ],
    devtool: DEVELOPMENT ? 'source-map' : '',
    plugins: [
      sharedConfig.plugins.definePlugin,
      !DEVELOPMENT ? () => {} : new webpack.HotModuleReplacementPlugin(),
    ],
    watchOptions: {
      ignored: /node_modules/
    }
  };
};

module.exports = (env, args) => {
  const DEVELOPMENT = args.mode === 'development';
  return clientConfig(DEVELOPMENT);
};
