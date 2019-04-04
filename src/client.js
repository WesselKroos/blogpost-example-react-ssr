import React from 'react';
import ReactDOM from 'react-dom';
import RenderClientside from './components/RenderClientside';
import getStore from './store';
import { hmrSetup } from './utils/hotModuleReloading';

//Hot reloading components in development mode
hmrSetup(module.hot);

const initialState = window.initialState || undefined;
const store = getStore(initialState);

const root = document.querySelector('#root');
ReactDOM.hydrate(<RenderClientside store={store} />, root);
