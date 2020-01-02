export const GET_POSTS_HOME = 'GET_POSTS_HOME';
export const LOAD_MORE_POSTS_HOME = 'LOAD_MORE_POSTS_HOME';

const initialState = {
  posts_home: [],
};

const mapActions = {
  [GET_POSTS_HOME]: (state, payload) => {
    return {
      ...state,
      posts_home: [...payload],
    };
  },
  [LOAD_MORE_POSTS_HOME]: (state, payload) => {
    return {
      ...state,
      posts_home: [...state.posts_home, ...payload],
    };
  },
};

export default (state = initialState, action) => {
  const fn = mapActions[action.type];
  return fn ? fn(state, action.payload) : state;
};
