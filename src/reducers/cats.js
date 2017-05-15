import { ADD_CAT, REMOVE_CAT, CHANGE_CAT_NAME, CHANGE_CAT_IMAGE, } from '../actions/types';

const initialState = {
  1: { id: 1, name: 'cheezburger', img: 'https://img.memesuper.com/d2eee997fefac6a426ba8807c275e482_the-rise-of-image-memes-i-can-haz-cheezburger-meme_570-595.jpeg', },
  2: { id: 2, name: 'Cat2', img: 'http://sharesloth.com/wp-content/uploads/2014/07/kcRUogc.jpg', },
};
let nextId = 3;

export default function cats(state = initialState, { type, payload, }) {
  switch (type) {
    case ADD_CAT: {
      /* expect payload to be {name: '...', img: string}*/
      return { ...state, [++nextId]: { id: nextId, ...payload, }, };
    } case CHANGE_CAT_NAME: {
      /* expect payload to be object of shape {id: integer, name: string}*/
      const { id, name, } = payload;
      return { ...state, [id]: { ...state[id], name, }, };
    } case CHANGE_CAT_IMAGE: {
      /* expect payload to be object of shape {id: integer, img: string}*/
      const { id, img, } = payload;
      return { ...state, [id]: { ...state[id], img, }, };
    } case REMOVE_CAT: {
      /* expect payload to be id of existing cat*/
      const nextState = { ...state, };
      delete nextState[payload];
      return nextState;
    }
    default:
      return state;
  }
}
