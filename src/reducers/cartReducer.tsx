export const ADD_CART = 'ADD_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const GET_CARTS = 'GET_CARTS';

const initialState = [];

const mapActions = {
  [ADD_CART]: (state, payload) => [...state, { ...payload }],
  [REMOVE_CART]: (state, payload) => [...state.filter(item => item.id !== payload)],
  [GET_CARTS]: (state, payload) => [...payload],
};

const reducer = (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};

export default reducer;
