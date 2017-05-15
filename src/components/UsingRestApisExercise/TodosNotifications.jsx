import React from 'react';
import FlipMove from 'react-flip-move';
import TransitionText from 'components/TransitionText';

const { object, } = React.PropTypes;
const { keys, } = Object;

const TodosNotifications = ({ todosRequest, userRequests, }) => {
  const aboutTodos = mapNotifications(todosRequest, 'todos');
  const aboutUsers = mapNotifications(userRequests, 'users');
  const notifications = [ ...aboutTodos, ...aboutUsers, ].sort((a, b) => a.created<b.created).map(({ component, }) => component);
  return (
    <div className='todos-notifications'>
      <FlipMove duration={750} easing='ease-out' typeName='div'>
        {notifications}
      </FlipMove>
    </div>
  );
};
TodosNotifications.propTypes = {
  todosRequest: object.isRequired,
  userRequests: object.isRequired,
};

function mapNotifications(request, subject) {
  const { pending, success, error, } = request;
  const acc = [];
  keys(pending).forEach(k => acc.push({
    created: pending[k].created,
    component: (<TransitionText key={k + subject} className='notification-item-pending' text={pending[k].message} />),
  }));
  keys(success).forEach(k => acc.push({
    created: success[k].created,
    component: (<TransitionText key={k + subject} className='notification-item-success' text={success[k].message} />),
  }));
  keys(error).forEach(k => acc.push({
    created: error[k].created,
    component: (<TransitionText key={k + subject} className='notification-item-error' text={error[k].message} />),
  }));
  return acc;
}

export default TodosNotifications;
