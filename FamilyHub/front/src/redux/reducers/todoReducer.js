import {
  SHOW_MODAL,
  EDIT_INPUT,
  SAVE_TASK,
  CHECK_TASK,
  DEL_TASK,
  GET_FAMILY_TODOS,
} from '../actionNames/ToDoActionNames';

const initialState = {
  list: [],
  isVisibleNewTask: false,
  newTaskTitle: '',
  editTaskID: -1,
  currentCheck: undefined,
  currentTaskIDInDB: -1,
  currentFamilyID: -1,
  returnedFromDBTaskID: -1,
  // Object.keys(myJson[0]): id,familyName,Todos
  // id,goal,author,active,createdAt,updatedAt,User
};

export default function (state = initialState, action) {
  // console.log('-----------------------');
  // console.log(`action.type: ${action.type}`);
  // console.log(`action.bool: ${action.bool}`);
  // console.log(`action.index: ${action.index}\n`);
  switch (action.type) {
    case SHOW_MODAL: {
      if (action.bool && action.index >= 0) {
        return {
          ...state,
          newTaskTitle: state.list[action.index].goal,
          editTaskID: action.index,
          currentTaskIDInDB: action.currIDinDB,
          currentCheck: state.list[action.index].active,
          isVisibleNewTask: action.bool,
        };
      }
      return {
        ...state,
        newTaskTitle: '',
        editTaskID: action.index,
        currentCheck: undefined,
        isVisibleNewTask: action.bool,
      };
    }

    case EDIT_INPUT: {
      // console.log('-----------------------');
      // console.log(`Object.keys(state): ${Object.keys(state)}`);
      // console.log(`state.list: ${state.list}`);
      // console.log(`action.type: ${action.type}`);
      // console.log(`action.text: ${action.text}`);
      return { ...state, newTaskTitle: action.text };
    }

    case SAVE_TASK: {
      let newList;
      // console.log('-----------------------');
      // console.log('onSaveNewTask - before setState:');
      // console.log(`state.list.length: ${state.list.length}`);
      // console.log(`state.newTaskTitle.length: ${state.newTaskTitle.length}`);
      // console.log(`state.editTaskID: ${state.editTaskID}`);
      // console.log(`state.currentCheck: ${state.currentCheck}`);
      // console.log(`typeof state.editTaskID: ${typeof state.editTaskID}\n`);

      if (state.list.length && state.newTaskTitle.length && state.editTaskID >= 0) {
        // if (action.lenToDo && action.titleLength && action.IDtask >= 0) {
        console.log(`Edit - state.editTaskID: ${state.editTaskID}`);
        console.log(`Edit - action.IDtask: ${state.editTaskID}`);
        // edit task - not empty array && there is a new text && editing task ID
        newList = state.list;
        newList[state.editTaskID].goal = state.newTaskTitle;
        return {
          ...state,
          list: newList,
          editTaskID: -1,
          currentCheck: undefined,
          newTaskTitle: '',
          isVisibleNewTask: false,
          returnedFromDBTaskID: action.IDtask,
        };
      }
      if (state.list.length && state.newTaskTitle.length && !(state.editTaskID >= 0)) {
        // if (action.lenToDo && action.titleLength && !(action.IDtask >= 0)) {
        console.log(`Not empty array - state.editTaskID: ${state.editTaskID}`);
        console.log(`action.goal: ${action.goal}\n`);
        console.log(`state.newTaskTitle: ${state.newTaskTitle}\n`);
        // adding new task - not empty array && there is a new text && not editing task ID
        return {
          ...state,
          // list: [...state.list, { title: state.newTaskTitle, active: false }],
          list: [{ goal: action.goal, active: true }, ...state.list],
          newTaskTitle: '',
          editTaskID: -1,
          currentCheck: undefined,
          isVisibleNewTask: false,
          returnedFromDBTaskID: action.IDtask,
        };
      }
      if (state.newTaskTitle.length) {
        console.log(`Empty array - state.newTaskTitle.length: ${state.newTaskTitle.length}`);
        // adding new task (first task) - empty array && not editing task ID
        return {
          ...state,
          list: [{ goal: state.newTaskTitle, active: true }],
          newTaskTitle: '',
          editTaskID: -1,
          currentCheck: undefined,
          isVisibleNewTask: false,
          returnedFromDBTaskID: action.IDtask,
        };
      }
      return { ...state, isVisibleNewTask: false };
    }

    case CHECK_TASK: {
      const newList = state.list;
      newList[action.index].active = !newList[action.index].active;
      // console.log(`newList[action.index].active: ${newList[action.index].active}`);
      return { ...state, list: [...newList] };
    }

    case DEL_TASK: {
      return {
        ...state,
        list: state.list.filter((task, index) => index !== action.index),
      };
    }

    case GET_FAMILY_TODOS: {
      return {
        ...state,
        list: action.loadedToDo,
        currentFamilyID: action.loadFamilyID,
      };
    }

    default:
      return state;
  }
}
