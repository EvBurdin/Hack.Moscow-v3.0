import { GET_FAMILY_TODOS, DEL_TASK, ADD_NEW_TASK } from '../actionNames/ToDoActionNames';

const initState = {
  familyToDo: [],
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_FAMILY_TODOS:
      console.log(action.payload);

      return { ...state, familyToDo: action.payload };
    case DEL_TASK:
      return { ...state, familyToDo: [...action.payload] };
    case ADD_NEW_TASK:
      return { ...state, familyToDo: [...action.payload] };
    default:
      return state;
  }
}
