import uuidV4 from 'uuid/v4';
import axios from 'common/axios';

import {
  START_USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_ERROR,
  CLEAR_USER_ERROR,
  SET_USERS,
  REMOVE_USER,
  UPSERT_USER,
  CLEAR_USER_SUCCESS, } from './types';

export function getAllUsers() {
  const subject = 'get_all_users';
  return function (dispatch, getState) {
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Fetching users', }, });
    return axios.get('/users')
        .then(({ data, }) => dispatch({ type: SET_USERS, payload: data, }))
        .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'Users fetched', }))
        .catch((err) => {
          console.error(err);
          setPostRequestMessage({ dispatch, type: 'error', subject, });
        });
  };
}

export function createUser({ name, imageUrl, }) {
  const subject = 'create_user';
  return function (dispatch, getState) {
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'creating user', }, });
    const id = uuidV4();
    dispatch({ type: UPSERT_USER, payload: { id, name, imageUrl, pending: true, }, });
    axios.post('/users', { id, name, imageUrl, })
        .then(({ data, }) => dispatch({ type: UPSERT_USER, payload: data, }))
        .then(() => setPostRequestMessage({ type: 'success', dispatch, subject, message: 'user created', }))
        .catch(err => {
          console.error(err);
          dispatch({ type: REMOVE_USER, payload: id, });
          setPostRequestMessage({ type: 'error', dispatch, subject, });
        });
  };
}

export function removeUser(userId) {
  const subject = 'remove_user';
  return function (dispatch, getState) {
    const user = getState().users.content[userId];
    dispatch({ type: REMOVE_USER, payload: userId, });
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Removing user', }, });
    axios.delete(`/users/${userId}`)
      .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'User removed', }))
      .catch(err => {
        console.error(err);
        dispatch({ type: UPSERT_USER, payload: user, });
        setPostRequestMessage({ dispatch, type: 'error', subject, });
      });
  };
}

export function getUserById(userId) {
  const subject = 'get_user_by_id';
  return function (dispatch, getState) {
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Fetching user', }, });
    axios.get(`/users/${userId}`)
        .then(({ data, }) => dispatch({ type: UPSERT_USER, payload: data, }))
        .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'User fetched', }))
        .catch(err => {
          console.error(err);
          setPostRequestMessage({ dispatch, type: 'error', subject, });
        });
  };
}

function setPostRequestMessage({ dispatch, type, subject, message, }) {
  if (type ==='error') {
    dispatch({ type: USER_REQUEST_ERROR, payload: { subject, message: message || '(╯°□°)╯︵ ┻━┻', }, });
    setTimeout(() => dispatch({ type: CLEAR_USER_ERROR, payload: subject, }), 2000);
  } else {
    dispatch({ type: USER_REQUEST_SUCCESS, payload: { subject, message, }, });
    setTimeout(() => dispatch({ type: CLEAR_USER_SUCCESS, payload: subject, }), 2000);
  }
}