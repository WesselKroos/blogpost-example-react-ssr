import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { hmrComponent } from '../utils/hotModuleReloading';

class RenderClientside extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default hmrComponent(RenderClientside);
