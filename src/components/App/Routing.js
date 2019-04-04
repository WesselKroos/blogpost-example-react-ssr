import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router';
import { matchPath } from 'react-router-dom';
import routes from '../../utils/routes';

export class Routing extends Component {
  /* SERVERSIDE-ONLY:START */
  static async preInitStore(store, url) {
    const route = routes.find(route =>
      matchPath(url, {
        exact: true,
        path: route.path
      })
    );
    if (!route || !route.Component || !route.Component.preInitStore) return;

    await route.Component.preInitStore(store, url);
  }
  /* SERVERSIDE-ONLY:END */

  render() {
    let { location } = this.props;

    return (
      <Switch location={location}>
        {routes.map(({ Component, path }) => (
          <Route exact={true} key={path} path={path} render={(...props) => <Component {...props} />} />
        ))}
      </Switch>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(Routing)
);
