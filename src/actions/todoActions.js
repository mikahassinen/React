import axios from 'common/axios';
import {
  START_TODOS_REQUEST,
  CLEAR_TODOS_SUCCESS,
  TODOS_REQUEST_ERROR,
  TODOS_REQUEST_SUCCESS,
  CLEAR_TODOS_ERROR,
  SET_TODOS,
  UPSERT_TODO,
  REMOVE_TODO, } from './types';

export function fetchTodos(userId) {
  return function (dispatch, getState) {
    const subject = 'fetch_todos';
    dispatch({ type: START_TODOS_REQUEST, payload: { subject, message: 'fetching todos', }, });
    return axios.get(`/users/${userId}/todos`)
      .then(({ data, }) => dispatch({ type: SET_TODOS, payload: data, }))
      .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'Todos fetched', }))
      .catch(err => {
        console.error(err);
        setPostRequestMessage({ dispatch, type: 'error', subject, });
      });
  };
}

export function toggleTodoDone(todoId){
  return function(dispatch, getState){
    console.error('toggleTodoDone not implemented');
  };
};
export function removeTodo(todoId){
  return function(dispatch, getState){
    console.error('removeTodo not implemented');
  };
}
export function addTodo(description){
  return function(dispatch, getState){
    console.error('addTodo not implemented');
  };
}

// No need to use this if you do not absolutely want to
function setPostRequestMessage({ dispatch, type, subject, message, }) {
  if (type ==='error') {
    dispatch({ type: TODOS_REQUEST_ERROR, payload: { subject, message: message || '(╯°□°)╯︵ ┻━┻', }, });
    setTimeout(() => dispatch({ type: CLEAR_TODOS_ERROR, payload: subject, }), 2000);
  } else {
    dispatch({ type: TODOS_REQUEST_SUCCESS, payload: { subject, message, }, });
    setTimeout(() => dispatch({ type: CLEAR_TODOS_SUCCESS, payload: subject, }), 2000);
  }
}
