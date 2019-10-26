import { GET_ALL_CHECKPOINTS, ADD_CHECKPOINT } from '../actionNames/AddNewZoneActionNames';

export const addNewCheckpoint = (data) => async (dispatch) => {
  // console.log(data);

  const {
 latitude, longitude, name, familyId, description, cookies 
} = data;
  try {
    const response = await fetch('http://134.209.82.36:3000/api/coordinates/location', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({
        latitude,
        longitude,
        name,
        FamilyId: familyId,
        description,
      }),
    });
    const myJson = await response.json();
    // console.log(myJson);
    myJson.User = data.User;
    // console.log(myJson);
    dispatch({ type: ADD_CHECKPOINT, payload: myJson });
  } catch (e) {
    console.log(e);
  }
};

export const getAllCheckpoints = (cookies) => async (dispatch) => {
  try {
    const response = await fetch('http://134.209.82.36:3000/api/coordinates/location', {
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
    dispatch({ type: GET_ALL_CHECKPOINTS, payload: myJson });
  } catch (e) {
    console.log(e);
  }
};

export const dellCheckpoints = (cookies, id, arr) => async (dispatch) => {
  // console.log(id);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      arr.splice(i, 1);
    }
  }
  // console.log(arr.length);
  try {
    const response = await fetch('http://134.209.82.36:3000/api/coordinates/location', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({ id }),
    });
    const myJson = await response.json();
    // console.log(myJson);
    dispatch({ type: GET_ALL_CHECKPOINTS, payload: arr });
  } catch (e) {
    console.log(e);
  }
};
