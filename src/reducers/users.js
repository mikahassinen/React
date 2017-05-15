import { combineReducers, } from 'redux';
import {
  UPSERT_USER,
  START_USER_REQUEST,
  USER_REQUEST_ERROR,
  USER_REQUEST_SUCCESS,
  CLEAR_USER_ERROR,
  SET_USERS,
  REMOVE_USER,
  CLEAR_USER_SUCCESS,
} from '../actions/types';

function content(state = {}, { type, payload, }) {
  switch (type) {
    case SET_USERS:
      return { ...payload, };
    case UPSERT_USER:
      return { ...state, [payload.id]: payload, };
    case REMOVE_USER: {
      const nextState = { ...state, };
      delete nextState[payload];
      return nextState;
    }
    default:
      return state;
  }
}

function request(state = { pending: {}, error: {}, success: {}, }, { type, payload, }) {
  switch (type) {
    case START_USER_REQUEST: {
      const pending = { ...state.pending, };
      const { subject, message, } = payload;
      pending[subject] = { message, created: new Date(), };
      return { ...state, pending, };
    } case USER_REQUEST_SUCCESS: {
    const pending = { ...state.pending, };
    const { subject, message, } = payload;
    const { created, } = pending[subject];
    delete pending[subject];
    const success = { ...state.success, };
    success[subject] = { message, created, };
    return { ...state, pending, success, };
  } case USER_REQUEST_ERROR: {
    const pending = { ...state.pending, };
    const { subject, message, } = payload;
    const { created, } = pending[subject];
    delete pending[subject];
    const error = { ...state.error, };
    error[subject] = { message, created, };
    return { ...state, pending, error, };
  } case CLEAR_USER_ERROR: {
    const error = { ...state.error, };
    delete error[payload];
    return { ...state, error, };
  } case CLEAR_USER_SUCCESS: {
    const success = { ...state.success, };
    delete success[payload];
    return { ...state, success, };
  } default:
    return state;
  }
}

export default combineReducers({ content, request, });
