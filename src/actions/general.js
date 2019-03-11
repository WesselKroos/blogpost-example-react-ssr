import types from './types';

// Action Creators
const request = () => ({ type: types.FETCH_GENERAL_REQUEST });
const success = payload => ({ type: types.FETCH_GENERAL_SUCCESS, payload });
const failure = (error) => ({ type: types.FETCH_GENERAL_FAILURE, error });

export const fetchGeneral = () => (dispatch) => {
  dispatch(request());
  console.log('fetching general data');

  return fetch('http://localhost:3000/assets/api/general.json')
    .then(response => response.json())
    .then(payload => dispatch(success(payload)))
    .catch(error => {
      console.error(error);
      dispatch(failure(error));
    });
};
