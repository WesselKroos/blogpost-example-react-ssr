const babelrc = require('../babel.config.js');
const webpack = require('webpack');

module.exports = DEVELOPMENT => {
  if (DEVELOPMENT) {
    if (babelrc.plugins.indexOf('react-hot-loader/babel') === -1) {
      babelrc.plugins.push('react-hot-loader/babel');
    }
  }

  return {
    module: {
      rules: {
        js: {
          test: /.js?$/,
          exclude: DEVELOPMENT ? [/node_modules/] : [], //Exclude node_modules when we use react-hot-loader
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                ...babelrc
              }
            }
          ]
        },
      }
    },
    resolve: {
      extensions: ['.js']
    },
    plugins: {
      definePlugin: new webpack.DefinePlugin({
        DEVELOPMENT: DEVELOPMENT
      })
    }
  };
};
