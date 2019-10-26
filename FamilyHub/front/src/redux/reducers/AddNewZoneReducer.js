import { GET_ALL_CHECKPOINTS, ADD_CHECKPOINT } from '../actionNames/AddNewZoneActionNames';

const initialState = {
  checkpoints: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHECKPOINTS: {
      return {
        ...state,
        checkpoints: [...action.payload],
      };
    }
    case ADD_CHECKPOINT: {
      return {
        ...state,
        checkpoints: [...state.checkpoints, action.payload],
      };
    }
    default:
      return state;
  }
}
