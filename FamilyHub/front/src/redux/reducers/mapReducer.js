import { PICK_COORDINATE, GET_FAMILY_LOCATION } from '../actionNames/mapActionNames';

const initState = {
  pickedCoordinate: '',
  familyGPSLocation: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case PICK_COORDINATE:
      return { ...state, pickedCoordinate: action.payload };
    case GET_FAMILY_LOCATION:
      return { ...state, familyGPSLocation: action.payload };
    default:
      return state;
  }
}
