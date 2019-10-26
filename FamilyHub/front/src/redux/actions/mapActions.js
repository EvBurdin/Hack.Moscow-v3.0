import { PICK_COORDINATE, GET_FAMILY_LOCATION } from '../actionNames/mapActionNames';

export const getFamilyLocations = (cookies) => async (dispatch) => {
  const response = await fetch('http://134.209.82.36:3000/api/family/coordinates', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
      credentials: 'same-origin',
      Cookie: `connect.sid=${cookies}`,
    },
  });
  const myJson = await response.json();
  // console.log(myJson);
  const data = [];
  for (let i = 0; i < myJson[0].Users.length; i++) {
    data.push(myJson[0].Users[i].Coordinates);
    data[i].user = myJson[0].Users[i].username;
  }
  dispatch({ type: GET_FAMILY_LOCATION, payload: data });
};

export const pickCoordinate = (coordinate) => async (dispatch) => {
  console.log(coordinate);
  dispatch({ type: PICK_COORDINATE, payload: coordinate });
};
