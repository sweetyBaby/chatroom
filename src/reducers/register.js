import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR, IS_USER_EXIST } from '../actions/const';

const initialState = {
  loaded: false,
  mes: '',
  existState: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        loaded: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        loaded: false,
        mes: action.message
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        loaded: true,
        mes: action.message
      };
    }
    case IS_USER_EXIST: {
      return {
        ...state,
        existState: action.result
      };
    }
    default: {
      return state;
    }
  }
}
export default reducer;
