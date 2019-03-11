import { combineReducers } from 'redux'

import general from './general'
import detail from './detail'

export default combineReducers({
  general,
  detail
});
