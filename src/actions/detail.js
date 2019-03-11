import types from './types';

// Action Creators
const request = () => ({ type: types.FETCH_DETAIL_REQUEST });
const success = payload => ({ type: types.FETCH_DETAIL_SUCCESS, payload });
const failure = (error) => ({ type: types.FETCH_DETAIL_FAILURE, error });

export const fetchDetail = () => dispatch => {
  dispatch(request());
  console.log('fetching detail data');

  return fetch('http://localhost:3000/assets/api/detail.json')
    .then(response => response.json())
    .then(payload => dispatch(success(payload)))
    .catch(error => {
      console.error(error);
      dispatch(failure(error));
    });
};
