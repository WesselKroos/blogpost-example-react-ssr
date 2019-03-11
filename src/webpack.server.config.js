const path = require("path");

const serverConfig = (DEVELOPMENT) => {
  const sharedConfig = require('./webpack.shared.config.js')(DEVELOPMENT)
  return {
    entry: {
      'server.bundle': '../src/server'
    },
    target: "node",
    output: {
      path: path.join(__dirname, '..', 'build'),
      publicPath: '/',
      libraryTarget: "commonjs2"
    },
    module: {
      rules: [
        sharedConfig.module.rules.js
      ],
    },
    resolve: sharedConfig.resolve,
    externals: {
      'node-fetch': 'node-fetch',
      express: 'express',
      webpack: 'webpack',
      'webpack-dev-middleware': 'webpack-dev-middleware',
      'webpack-hot-middleware': 'webpack-hot-middleware',
      '../src/webpack.client.config.js': '../src/webpack.client.config.js'
    },
    devtool: (DEVELOPMENT) ? 'source-map' : '',
    plugins: [
      sharedConfig.plugins.definePlugin
    ],
    optimization: {
      minimize: false
    },
    watchOptions: {
      ignored: /node_modules/
    }
  }
};

module.exports = (env, args) => {
  const DEVELOPMENT = (args.mode === 'development')
  return serverConfig(DEVELOPMENT)
}