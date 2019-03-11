import { createStore as reduxCreateStore, applyMiddleware, compose as reduxCompose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const createStore = preloadedState => {
  // Add Redux Devtools hook
  const reduxDevtoolsAvailable = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const compose = !reduxDevtoolsAvailable ? reduxCompose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

  //Create the store
  return reduxCreateStore(reducers, preloadedState, compose(applyMiddleware(thunk)));
};

let store;

export const clearStore = () => {
  store = undefined;
};

export default preloadedState => {
  if (!store) {
    store = createStore(preloadedState);
  }
  return store;
};
