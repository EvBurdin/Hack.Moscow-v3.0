import { GET_FAMILY_TODOS, DEL_TASK, ADD_NEW_TASK } from '../actionNames/ToDoActionNames';

export const getFamilyTodos = (cookies) => async (dispatch) => {
  const response = await fetch('http://134.209.82.36:3000/api/family/todo', {
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
  // console.log('JSON + \n');
  // console.log(myJson);

  // const data = [];
  // for (let i = 0; i < myJson[0].Users.length; i++) {
  //   data.push(myJson[0].Users[i].Coordinates);
  //   data[i].user = myJson[0].Users[i].username;
  // }
  dispatch({ type: GET_FAMILY_TODOS, payload: myJson[0].Todos });
};

export const addNewTask = (item) => async (dispatch) => {
  // console.log(item);

  const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
      credentials: 'same-origin',
      Cookie: `connect.sid=${item.cookies}`,
    },
    body: JSON.stringify({
      todoElements: item.tasks,
      goal: item.name,
      familyId: item.familyId,
      locationId: item.location.id,
    }),
  });
  const myJson = await response.json();
  item.arr.push({
    goal: item.name,
    User: { photo: item.photo },
    Location: {
      name: item.location.name,
      // latitude:
      // longitude:
    },
    todoElements: item.tasks,
  });
  dispatch({ type: ADD_NEW_TASK, payload: item.arr });
};

export const deleteTodos = (cookies, id, arr) => async (dispatch) => {
  try {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
      }
    }
    const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({
        id,
      }),
    });
    const myJson = await response;
    // console.log('JSON + \n');
    // console.log(myJson);
    // console.log(arr);
    dispatch({ type: DEL_TASK, payload: arr });
  } catch (error) {
    console.log(error);
  }
};
// export const pickCoordinate = (coordinate) => async (dispatch) => {
//   console.log(coordinate);
//   dispatch({ type: PICK_COORDINATE, payload: coordinate });
// };
