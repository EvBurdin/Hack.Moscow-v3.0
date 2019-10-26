import { GET_ALL_CHECKPOINTS, ADD_CHECKPOINT } from '../actionNames/AddNewZoneActionNames';

const initialState = {
  checkpoints: [
    // {
    //   cookies: 's:r_iPcn9cRFR7xSInWrukHI7ki7MMTSGR.Fr6PKw8PBXf1ETc9t3bV7h9KrdnJjfp8Y9Ga4TgtuLM',
    //   description: 'скорее',
    //   familyId: 1,
    //   latitude: 55.71320451996077,
    //   longitude: 37.598099894821644,
    //   name: 'план',
    // },
  ],
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
