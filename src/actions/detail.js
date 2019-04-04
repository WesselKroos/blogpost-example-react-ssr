import types from './types';

// Action Creators
const request = () => ({ type: types.FETCH_DETAIL_REQUEST });
const success = payload => ({ type: types.FETCH_DETAIL_SUCCESS, payload });
const failure = error => ({ type: types.FETCH_DETAIL_FAILURE, error });

export const fetchDetail = () => async dispatch => {
  dispatch(request());
  console.log('fetching detail data');

  try {
    const response = await fetch('http://localhost:3000/assets/api/detail.json');
    const payload = await response.json();
    dispatch(success(payload));
  } catch (error) {
    dispatch(failure(error));
    throw error;
  }
};
