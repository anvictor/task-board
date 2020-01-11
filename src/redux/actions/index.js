import * as types from '../constants/actions';

export const setContact = (user) => {
  return {
    type: types.SET_CONTACT,
    payload: {
      user: user,
    }
  }
};
