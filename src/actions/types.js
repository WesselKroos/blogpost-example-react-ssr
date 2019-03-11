const generateTypes = (names) => {
  const actionTypes = {}
  Object.keys(names).forEach(name => {
    actionTypes[name] = name
  })
  return actionTypes
}

export default generateTypes({
  FETCH_GENERAL_REQUEST: null,
  FETCH_GENERAL_SUCCESS: null,
  FETCH_GENERAL_FAILURE: null,

  FETCH_HOME_REQUEST: null,
  FETCH_HOME_SUCCESS: null,
  FETCH_HOME_FAILURE: null,

  FETCH_DETAIL_REQUEST: null,
  FETCH_DETAIL_SUCCESS: null,
  FETCH_DETAIL_FAILURE: null,
});
