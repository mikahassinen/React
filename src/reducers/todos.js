import { combineReducers, } from 'redux';
import {
  CLEAR_TODOS_ERROR,
  CLEAR_TODOS_SUCCESS,
  START_TODOS_REQUEST,
  TODOS_REQUEST_ERROR,
  TODOS_REQUEST_SUCCESS,
  REMOVE_TODO,
  UPSERT_TODO,
  SET_TODOS,
} from '../actions/types';


function content(state = {}, { type, payload, }) {
  switch (type) {
    case SET_TODOS:
      return { ...payload, };
    case UPSERT_TODO:
      // TODO
    case REMOVE_TODO: {
      // TODO
    }
    default:
      return state;
  }
}

//This part of the reducer is extra. Do not use your time figuring this out unless you are done whit everything else
function request(state = { pending: {}, error: {}, success: {}, }, { type, payload, }) {
  switch (type) {
    case START_TODOS_REQUEST: {
      const pending = { ...state.pending, };
      const { subject, message, } = payload;
      pending[subject] = { message, created: new Date(), };
      return { ...state, pending, };
    } case TODOS_REQUEST_SUCCESS: {
    const pending = { ...state.pending, };
    const { subject, message, } = payload;
    const { created, } = pending[subject];
    delete pending[subject];
    const success = { ...state.success, };
    success[subject] = { message, created, };
    return { ...state, pending, success, };
  } case TODOS_REQUEST_ERROR: {
    const pending = { ...state.pending, };
    const { subject, message, } = payload;
    const { created, } = pending[subject];
    delete pending[subject];
    const error = { ...state.error, };
    error[subject] = { message, created, };
    return { ...state, pending, error, };
  } case CLEAR_TODOS_ERROR: {
    const error = { ...state.error, };
    delete error[payload];
    return { ...state, error, };
  } case CLEAR_TODOS_SUCCESS: {
    const success = { ...state.success, };
    delete success[payload];
    return { ...state, success, };
  } default:
    return state;
  }
}

export default combineReducers({ content, request, });