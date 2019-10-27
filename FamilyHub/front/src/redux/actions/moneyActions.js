import {
  ADD_TOTALMONTH,
  ADD_ALLCATEGORY,
  ADD_SPENDMONTH,
} from '../actionNames/moneyActionNames';
export const spendMonth = (date,cookies) => async (dispatch) => {
  try {
    const response = await fetch(`http://134.209.82.36:3000/api/family/spend/month?date=${date}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const data = await response.json();
    dispatch({ type: ADD_SPENDMONTH, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const addNewSpend = (date, cookies) => async (dispatch) => {
  try {
    // console.log('ШКАФФФФФФaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',date);
    const response = await fetch('http://134.209.82.36:3000/api/spend', {
      method: 'POST',
      body: JSON.stringify(date),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    // getEvents(cookies)(dispatch);
    // dispatch({ type: ADD_EVENT, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const getAllCategories = (cookies) => async (dispatch) => {
  try {
    
    const response = await fetch(`http://134.209.82.36:3000/api/spend/category`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const data = await response.json();
    dispatch({ type: ADD_ALLCATEGORY, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const getTotalMonth = (date,cookies) => async (dispatch) => {
  try {
    
    const response = await fetch(`http://134.209.82.36:3000/api/family/spend/month/total?date=${date}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const data = await response.json();
    // console.log('DATE=========',data);
    dispatch({ type: ADD_TOTALMONTH, payload: data });
  } catch (err) {
    console.log(err);
  }
};
