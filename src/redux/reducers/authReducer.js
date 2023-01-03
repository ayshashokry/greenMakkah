import {
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
  SET_CURRENT_COUNTER,
  SET_CURRENT_TOKEN,
  UPDATE_FAILED_LOGIN,
  RESET_FAILED_COUNTER,
  EDIT_PROFILE,
} from "../actions/rootActions";
import isEmpty from "../helpers/is-Empty";
const initialState = {
  isAuth: false,
  user: {},
  failedCounter: 0,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        failedCounter: state.failedCounter + 1,
      };
    case UPDATE_FAILED_LOGIN:
      return {
        ...state,
        failedCounter: action.payload,
      };
    case RESET_FAILED_COUNTER:
      return {
        ...state,
        failedCounter: 0,
      };
    case LOGOUT:
      return { isAuth: false, user: {}, failedCounter: 0 };

    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_CURRENT_COUNTER:
      return {
        ...state,
        failedCounter: action.payload,
      };

    case SET_CURRENT_TOKEN:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        token: action.payload,
      };
    default:
      return state;
  }
}
