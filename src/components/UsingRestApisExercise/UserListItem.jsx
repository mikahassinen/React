import React from 'react';
import Img from 'components/Img';

const { func, string, } = React.PropTypes;

const UserListItem = ({ id, name, imageUrl, pending, onSelect, onRemove, }) => (
  <div
    className={`user-item-container ${pending && 'pending-item'}`}>
    <Img
      className='user-image-thumbnail'
      src={imageUrl}/>
    <div className='user-right-container'>
      <p className='user-item-name'>{name}</p>
      <button
        disabled={pending}
        onClick={() => onSelect(id)}
        className='user-button'>Select
      </button>
      <button
        disabled={pending}
        onClick={() => onRemove(id)}
        className='user-button'>
        Remove
      </button>
    </div>
  </div>
);

UserListItem.propTypes = {
  imageUrl: string,
  name: string,
  onSelect: func,
  onRemove: func,
};
export default UserListItem;