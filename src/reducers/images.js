import { SHUFFLE_IMAGES, ADD_IMAGE, SELECT_IMAGE, REMOVE_IMAGE, RESET_IMAGES, } from '../actions/types';

const catUrl1 = 'https://rlv.zcache.com/svc/getimage?id=81395868-49ec-4545-a0f0-b560122693e5&max_dim=324&square_it=true';
const catUrl2 = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSnfkQ16Rs9B0wFX1EzMNdsVY8r_95P1DyEblgjikhm-WUC30JBUw';
const catUrl3 = 'http://cdn2-www.cattime.com/assets/uploads/gallery/25-funny-cat-memes/003-FUNNY-CAT-MEME.jpg';
const catUrl4 = 'http://s2.dmcdn.net/Ub1O8/1280x720-mCQ.jpg';
const catUrl5 = 'https://i.ytimg.com/vi/htOroIbxiFY/hqdefault.jpg';
const catUrls = [ catUrl1, catUrl2, catUrl3, catUrl4, catUrl5, ];

export default function catImage(state = { images: catUrls, selectedImage: 0, }, action) {
  switch (action.type) {
    case SELECT_IMAGE:
      return { ...state, selectedImage: action.payload, };
    case REMOVE_IMAGE: {
      let images = [ ...state.images, ];
      const { payload, } = action;
      images = [ ...images.slice(0, payload), ...images.slice(payload+1, images.length), ];
      return { ...state, images, };
    } case RESET_IMAGES:
      return { ...state, images: catUrls, };
      /* TODO
    case 'ADD_IMAGE':
      ...
    case 'SHUFFLE_IMAGES':
      ...
    */
    default:
      return state;
  }
}
