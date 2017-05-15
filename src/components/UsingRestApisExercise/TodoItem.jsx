import React from 'react';
import RemoveIcon from './RemoveIcon';

const { string, bool, func, } = React.PropTypes;
const TodoItem = ({ id, description, done, onDoneToggle, onRemove, }) => (
  <div className='todo-item'>
    <div>{description}</div>
    <input
      type='checkbox' checked={done}
      onChange={() => onDoneToggle(!done)} />
    <RemoveIcon onRemove={() => onRemove(id)} />
  </div>);
TodoItem.propTypes = {
  done: bool,
  description: string.isRequired,
  onDoneToggle: func.isRequired,
  onRemove: func.isRequired,
};

export default TodoItem;
