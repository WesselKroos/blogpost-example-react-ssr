import React, { Component } from "react";
import { Provider } from "react-redux";
import { StaticRouter } from 'react-router-dom'
import App from "./App";

export default class RenderServerside extends Component {
  render() {
    const {
      location,
      context,
      store
    } = this.props

    return (
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )
  }
}