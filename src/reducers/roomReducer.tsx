export const UPDATE_ROOM = 'UPDATE_ROOM';

const initialState = {
  current: [],
};

const mapActions = {
  [UPDATE_ROOM]: (state, payload) => ({
    current: payload,
  }),
};

const reducer = (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
