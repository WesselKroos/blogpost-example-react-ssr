//Serverside rendering
import React from 'react';
import { renderToString } from 'react-dom/server';
import RenderServerside from '../components/RenderServerside';
import App from '../components/App';
import getStore, { clearStore } from '../store';

export const loadStoreData = async req => {
  const url = req.originalUrl || req.url;
  const store = getStore();

  await App.preInitStore(store, url);
  return {
    renderedString: renderToString(<RenderServerside store={store} location={url} />),
    state: store.getState()
  };
};

export const clearData = () => {
  clearStore();
};

export default {
  loadStoreData,
  clearData
};
