import { MODAL_SHOW1, MODAL_SHOW2 } from '../actionNames/systemActionName';

const initState = {
  modalShow1: false,
  modalShow2: false,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case MODAL_SHOW1:
      return { ...state, modalShow1: !state.modalShow1 };
    case MODAL_SHOW2:
      return { ...state, modalShow2: !state.modalShow2 };
    // case DEL_TASK:
    //     return { ...state, familyToDo: action.payload };
    default:
      return state;
  }
}
