global.fetch = require('node-fetch');
import express from 'express';
import render from './server/render';
import prerendering from './server/prerendering';

//Express setup
const app = express();
const prerender = !DEVELOPMENT;

if (DEVELOPMENT) {
  //Build client bundle and (hot)reloading

  const webpack = require('webpack');
  const webpackClientConfig = require('../src/webpack.client.config.js')(undefined, { mode: 'development' });
  webpackClientConfig.mode = 'development';
  const compiler = webpack(webpackClientConfig);
  app.use(
    require('webpack-dev-middleware')(compiler, {
      writeToDisk: true,
      stats: webpackClientConfig.stats,
      performance: webpackClientConfig.performance
    })
  );
  app.use(require('webpack-hot-middleware')(compiler, {}));
}

//Static files
app.use('/assets', express.static('../public/assets'));

//Dynamic files
app.use(/\/((?!assets).)*/, (req, res, next) => {
  console.log(`Received request for ${req.originalUrl || req.url}`);

  //skip if the browser did not request a html page
  if (req.headers.accept.indexOf('text/html') === -1) return next();

  //Process content
  const prepare = !prerender
    ? render()
    : new Promise((resolve, reject) => {
        console.log('Loading data');
        prerendering
          .loadStoreData(req)
          .then(({ renderedString, state }) => render(renderedString, state))
          .then(resolve)
          .catch(reject);
      });

  //Remove the store
  const cleanup = prerender ? () => prerendering.clearData() : () => {};

  //Send response
  prepare
    .then(html => {
      console.log(`Sending response for ${req.originalUrl || req.url}`);
      if (html) res.send(html);
      cleanup();
    })
    .catch(error => {
      cleanup();
      next(error);
    });
});

//Throw an error if no path matches
app.use('*', (req, res, next) => {
  const error = new Error(`Cannot not find "${req.originalUrl || req.url}"`);
  error.code = 404;
  throw error;
});

//Return the error response
app.use((error, req, res, next) => {
  error.code = error.code || 500;
  res.status(error.code);

  if (error.code >= 500 && error.code < 600) {
    console.error(`${error.code} Server`, error.stack);
  }

  //HTML
  if ((req.headers.accept || '').indexOf('text/html') !== -1) {
    res.send(`<style>body { font-family: arial; }</style><h1>${error.code} Server error</h1><b>${error.name}:</b><h2><i>${error.message}</i></h2><b>Stack Trace:</b><pre>${error.stack}</pre>`);
    return;
  }

  //DEFAULT
  let mimeType = (req.headers.accept || '').split(',')[0] || 'text';
  mimeType = mimeType === '*/*' ? 'text' : mimeType;
  res.type(mimeType).send(`Server error: ${error.code}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening');
});
