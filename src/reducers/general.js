import types from '../actions/types';
import { createReducer } from '../utils/redux';

const initialState = {
  loading: false,
  error: undefined,
  name: undefined
}

export default createReducer(initialState, {
  [types.FETCH_GENERAL_REQUEST]: (state, action) => {
    return { ...state, loading: true, error: undefined }
  },
  [types.FETCH_GENERAL_FAILURE]: (state, action) => {
    return { ...state, loading: false, error: action.error }
  },
  [types.FETCH_GENERAL_SUCCESS]: (state, action) => {
    return { ...state, loading: false, name: action.payload.name };
  }
});
