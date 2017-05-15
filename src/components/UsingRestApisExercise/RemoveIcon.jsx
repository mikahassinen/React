import React from 'react';
import Fa from 'react-fontawesome';

const RemoveIcon = ({ onRemove, }) => (
  <span className='remove-icon' onClick={onRemove}>
    <Fa name='trash' />
  </span>
  );

export default RemoveIcon;