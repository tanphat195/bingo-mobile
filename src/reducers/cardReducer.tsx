export const UPDATE_CARD = 'UPDATE_CARD';

const initialState = {
  cards: [],
};

const mapActions = {
  [UPDATE_CARD]: (state, payload) => ({
    cards: payload,
  }),
};

const reducer = (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
