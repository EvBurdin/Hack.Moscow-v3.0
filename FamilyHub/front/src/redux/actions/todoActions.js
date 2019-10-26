import {
  SHOW_MODAL,
  EDIT_INPUT,
  SAVE_TASK,
  CHECK_TASK,
  DEL_TASK,
  GET_FAMILY_TODOS,
} from '../actionNames/ToDoActionNames';

export const showModal = (needToShow, i, currID) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    bool: needToShow,
    index: i,
    currIDinDB: currID,
  });
};
export const editInput = (txt) => async (dispatch) => {
  dispatch({
    type: EDIT_INPUT,
    text: txt,
  });
};

export const saveTaskNew = (todoLen, title, check, taskID, famID, cookies) => async (dispatch) => {
  if (todoLen && title.length && taskID >= 0) {
    // edit task - not empty array && there is a new text && editing task ID
    try {
      console.log('-----------------------');
      console.log('trying FETCH - PUT - UPDATE TITLE...');
      console.log(`todoLen: ${todoLen}, title: ${title}, check: ${check}, taskID: ${taskID}`);
      const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${cookies}`,
        },
        body: JSON.stringify({
          goal: title,
          active: check,
          id: taskID,
        }),
      });
      const myJson = await response.json();
      // console.log(`Response on UPDATE TITLE: ${myJson}`);
      dispatch({
        type: SAVE_TASK,
        lenToDo: todoLen,
        titleLength: title.Length,
        IDtask: taskID,
      });
    } catch (err) {
      // console.log(`Error with UPDATE TITLE family TODOs: ${err}\n`);
    }
  }

  //------------------------------------------------------------------------------
  // if (todoLen && title.length && !(taskID >= 0)) {
  if (title.length && !(taskID >= 0)) {
    // (state.list.length && state.newTaskTitle.length && !(state.editTaskID >= 0))
    // adding new task - not empty array && there is a new text && not editing task ID
    try {
      console.log('-----------------------');
      console.log('trying FETCH - POST - ADD NEW TASK...');
      console.log(`todoLen: ${todoLen}, title: ${title}, check: ${check}, famID: ${famID}`);
      const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${cookies}`,
        },
        body: JSON.stringify({
          goal: title,
          familyId: famID,
        }),
      });
      const myJson = await response.json();
      console.log(`Response on ADD NEW TASK: ${myJson}`);
      // console.log(`Object.keys(myJson): ${Object.keys(myJson)}`);
      // console.log(`Object.keys(myJson[0]): ${Object.keys(myJson[0])}`);
      console.log(`myJson.id: ${myJson.id}`);
      // Object.keys(myJson): active,id,goal,FamilyId,author,updatedAt,createdAt
      dispatch({
        type: SAVE_TASK,
        goal: title,
        lenToDo: todoLen,
        titleLength: title.Length,
        IDtask: myJson.id,
        boolActive: myJson.active,
      });
    } catch (err) {
      console.log(`Error with ADD NEW TASK in family TODOs: ${err}\n`);
    }
  }
};

export const saveTask = () => async (dispatch) => {
  dispatch({
    type: SAVE_TASK,
  });
};

export const checkTask = (title, checked, i, taskID, cookies) => async (dispatch) => {
  try {
    // console.log('-----------------------');
    // console.log('trying FETCH - PUT - CHECK...');
    const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({ goal: title, active: !checked, id: taskID }),
    });
    const myJson = await response.json();
    console.log(`Response on CHECK: ${myJson}`);

    dispatch({
      type: CHECK_TASK,
      index: i,
    });
  } catch (err) {
    // console.log(`Error with CHECKING family TODOs: ${err}\n`);
  }
};
export const delTask = (i, taskID, cookies) => async (dispatch) => {
  try {
    // console.log('-----------------------');
    // console.log('trying FETCH - DELETE - ...');
    const response = await fetch('http://134.209.82.36:3000/api/user/todo', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({ id: taskID }),
    });
    const myJson = await response.json();
    console.log(`Response on DELETE: ${myJson}`);

    dispatch({
      type: DEL_TASK,
      index: i,
    });
  } catch (err) {
    // console.log(`Error with DELETING family TODOs: ${err}\n`);
  }
  //--------------------------
};

export const getFamilyToDo = (cookies) => async (dispatch) => {
  try {
    // console.log('-----------------------');
    // console.log('trying FETCH - GET...');
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
    // console.log(`Object.keys(myJson[0]): ${Object.keys(myJson[0])}`);
    // Object.keys(myJson[0]): id,familyName,Todos
    // console.log(`Object.keys(myJson[0].Todos): ${Object.keys(myJson[0].Todos)}`);
    // console.log(`Object.keys(myJson[0].Todos[0]): ${Object.keys(myJson[0].Todos[0])}\n`);
    const data = myJson[0].Todos;
    dispatch({
      type: GET_FAMILY_TODOS,
      loadedToDo: data,
      loadFamilyID: myJson[0].id,
    });
  } catch (err) {
    // console.log(`Error with loading family TODOs: ${err}\n`);
  }
};
