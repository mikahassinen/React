import { combineReducers, } from 'redux';
import image from './images';
import cats from './cats';
import users from './users';
import todos from './todos';

export default combineReducers({ image, cats, users, todos, });
