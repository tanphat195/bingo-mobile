export const UPDATE_TICKET = 'UPDATE_TICKET';

const initialState = {
  list: [],
};

const mapActions = {
  [UPDATE_TICKET]: (state, payload) => ({
    list: payload,
  }),
};

const reducer = (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
