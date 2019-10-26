import { MODAL_SHOW1, MODAL_SHOW2 } from '../actionNames/systemActionName';

export const ModalShow1 = () => async (dispatch) => {
  dispatch({ type: MODAL_SHOW1, payload: '' });
};
export const ModalShow2 = () => async (dispatch) => {
  dispatch({ type: MODAL_SHOW2, payload: '' });
};
