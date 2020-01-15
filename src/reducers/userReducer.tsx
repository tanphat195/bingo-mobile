export const UPDATE_USER = 'UPDATE_USER';

const initialState = {};

const mapActions = {
  [UPDATE_USER]: (state, payload) => payload,
};

const reducer = (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
