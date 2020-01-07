export const UPDATE_TOKEN = 'UPDATE_TOKEN';

const initialState = {
  token: '',
};

const mapActions = {
  [UPDATE_TOKEN]: (state, payload) => ({
    token: payload,
  }),
};

const reducer = (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
