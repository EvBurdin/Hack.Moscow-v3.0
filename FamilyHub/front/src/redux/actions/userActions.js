import {
  USER_LOGIN, //
  USER_LOGOUT,
  USER_ADD_FAMILY,
  GET_FAMILY,
} from '../actionNames/userActionNames';

export const userLogin = (user, cookie) => (dispatch) => {
  dispatch({ type: USER_LOGIN, payload: { user, cookie } });
};
export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT, payload: {} });
};
export const userAddFamily = (user, family) => (dispatch) => {
  const newUser = user;
  newUser.Family = family;
  dispatch({ type: USER_ADD_FAMILY, payload: newUser });
};

export const getFamily = (cookies) => async (dispatch) => {
  const response = await fetch('http://134.209.82.36:3000/api/family/users', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
      credentials: 'same-origin',
      Cookie: `connect.sid=${cookies}`,
    },
  });
  const resp = await response.json();
  const data = resp[0].Users;

  // console.log('my family ------------', resp);
  // const data = [];
  // for (let i = 0; i < myJson[0].Users.length; i++) {
  //   data.push(myJson[0].Users[i].Coordinates);
  //   data[i].user = myJson[0].Users[i].username;
  // }
  dispatch({ type: GET_FAMILY, payload: data });
};
