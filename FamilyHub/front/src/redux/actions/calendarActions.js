/* eslint-disable import/prefer-default-export */
import {
  ADD_EVENT, //
  DELETE_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
} from '../actionNames/calendarActionNames';

export const getEvents = (cookies) => async (dispatch) => {
  console.log('===============================================start get\n');

  try {
    const response = await fetch('http://134.209.82.36:3000/api/family/calendar', {
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
    // console.log('ENENTSAFTERDELETE=====================', data);
    const calendars = data[0].Calendars;
    console.log('calendars--------------------\n', calendars);
    const selected = calendars.map((date) => date.dateStart.substr(0, 10));
    // console.log('selected ----------',selected);
    const selectedObj = {};
    selected.forEach((element) => {
      selectedObj[element] = { color: 'limegreen' };
    });
    const selectedCalendars = {};
    calendars.forEach((element) => {
      if (!selectedCalendars[element.dateStart.substr(0, 10)]) {
        selectedCalendars[element.dateStart.substr(0, 10)] = [];
      }
      selectedCalendars[element.dateStart.substr(0, 10)].push({
        id: element.id,
        title: element.title,
        text: element.text,
      });
    });
    // console.log('selectedObj--------', selectedObj);
    console.log('selectedCalendars--------\n', selectedCalendars);

    dispatch({ type: GET_EVENT, payload: { selectedObj, selectedCalendars } });
  } catch (err) {
    console.log(err);
  }
};

export const addEvent = (cookies, event) => async (dispatch) => {
  try {
    console.log('============ FETCH============', cookies, event);

    const response = await fetch('http://134.209.82.36:3000/api/user/calendar', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    getEvents(cookies)(dispatch);
    // dispatch({ type: ADD_EVENT, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteEvent = (cookies, id) => async (dispatch) => {
  console.log('================================================start deleted\n');

  try {
    const response = await fetch('http://134.209.82.36:3000/api/user/calendar', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    // const data = await response.json();
    // dispatch({ type: DELETE_EVENT, payload: data });
    getEvents(cookies)(dispatch);
  } catch (err) {
    console.log(err);
  }
};

export const updateEvent = (cookies) => async (dispatch) => {
  try {
    const response = await fetch('http://134.209.82.36:3000/api/user/calendar', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch({ type: UPDATE_EVENT, payload: data });
  } catch (err) {
    console.log(err);
  }
};
