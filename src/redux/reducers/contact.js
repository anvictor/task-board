import InitialState from '../constants/initialState';
import * as types from '../constants/actions';

export default function contactReducer(state = InitialState.contact, action) {

  switch (action.type) {
    case types.SET_CONTACT:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state
  }
}

