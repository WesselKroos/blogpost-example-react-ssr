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
app.use('/*', async (req, res, next) => {
  const url = req.originalUrl || req.url;
  console.log(`Received request for ${url}`);

  //Skip if the browser did not request a html page
  if (req.headers.accept.indexOf('text/html') === -1) return next();

  //Skip if request to the assets folder
  if (url.indexOf('/assets/') === 0) return next();

  try {
    //Process content
    console.log('Loading data');
    const data = prerender ? await prerendering.loadStoreData(req) : {};
    const { renderedString, state } = data;
    const html = await render(renderedString, state);

    //Send response
    console.log(`Sending response for ${url}`);
    res.send(html);

    //Remove the store
    if (prerender) prerendering.clearData();
  } catch (error) {
    next(error);
  }
});

// 404 - Not found
app.get('/*', (req, res, next) => {
  console.warn('Route not found:', req.originalUrl || req.url);
  res.status(404);
  res.send(`Cannot find "${req.originalUrl || req.url}"`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(`500 Server error: ${error.message}`, error.stack);
  res.status(500).end();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening');
});
