import types from './types';

// Action Creators
const request = () => ({ type: types.FETCH_GENERAL_REQUEST });
const success = payload => ({ type: types.FETCH_GENERAL_SUCCESS, payload });
const failure = error => ({ type: types.FETCH_GENERAL_FAILURE, error });

export const fetchGeneral = () => async dispatch => {
  dispatch(request());
  console.log('fetching general data');

  try {
    const response = await fetch('http://localhost:3000/assets/api/general.json');
    const payload = await response.json();
    dispatch(success(payload));
  } catch (error) {
    dispatch(failure(error));
    throw error;
  }
};
