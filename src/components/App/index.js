import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { fetchGeneral } from '../../actions/general';
import Routing from './Routing';
import routes from '../../utils/routes';

class App extends Component {
  /* SERVERSIDE-ONLY:START */
  static preInitStore(store, url) {
    return Promise.resolve(store.dispatch(fetchGeneral()))
      .then(() => Routing.preInitStore(store, url));
  }
  /* SERVERSIDE-ONLY:END */

  componentDidMount() {
    const { loading, error, name } = this.props;
    if (loading || error || name) return;

    this.props.fetchGeneral();
  }

  render() {
    let { loading, error, name } = this.props;

    return (
      <React.Fragment>
        <header>
          <h1>
            {loading ? (
              'Fetching general data...'
            ) : error ? (
              <div>
                Could not fetch the general data
                <br />
                <button onClick={this.props.fetchGeneral}>Retry fetching the general data</button>
              </div>
            ) : (
              name || ''
            )}
          </h1>
          <ul>
            {routes.map(route => (
              <li key={route.path}>
                <NavLink to={route.path} activeStyle={{ color: '#fff', background: '#04d' }} exact={true}>
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </header>
        <Routing />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  name: state.general.name,
  loading: state.general.loading
});

const mapDispatchToProps = {
  fetchGeneral
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
