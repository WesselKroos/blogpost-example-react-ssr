import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDetail } from '../../actions/detail';

class DetailPage extends Component {
  /* SERVERSIDE-ONLY:START */
  static async preInitStore(store, url) {
    await store.dispatch(fetchDetail());
  }
  /* SERVERSIDE-ONLY:END */

  componentDidMount() {
    const { loading, error, content } = this.props;
    if (loading || error || content) return;

    this.props.fetchDetail();
  }

  render() {
    let { loading, error, content } = this.props;

    if (loading) {
      return <div>Fetching the detail data...</div>;
    }

    if (error) {
      return (
        <div>
          Could not fetch the detail data
          <br />
          <button onClick={this.props.fetchDetail}>Retry fetching the detail data</button>
        </div>
      );
    }

    if (!content) {
      return <button onClick={this.props.fetchDetail}>Fetch the detail data</button>;
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  ...state.detail
});

const mapDispatchToProps = {
  fetchDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
