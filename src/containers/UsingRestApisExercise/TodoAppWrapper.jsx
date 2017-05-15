import React from 'react';
import { connect, } from 'react-redux';
import TodoNotifications from 'components/UsingRestApisExercise/TodosNotifications';

const { object, } = React.PropTypes;

@connect(({ users, todos, }) => ({ users, todos, }))
export default class TodoAppWrapper extends React.Component {

  static propTypes = {
    users: object.isRequired,
    todos: object.isRequired,
  };

  render() {
    const { users, todos, children, } = this.props;
    return (
      <div>
        <TodoNotifications userRequests={users.request} todosRequest={todos.request} />
        <div className='note-exercise-m'>
          <p>Files related to the exercise are under</p>
          <ul>
            <li>components/UsinRestApisExercise</li>
            <li>containers/UsinRestApisExercise</li>
            <li>reducers/todos && reducers/users</li>
            <li>Note that  <b>backend throws error time to time</b></li>
          </ul>
          <p>Start with Users container and then move on to Todos container</p>
          <div className='todos-app-container'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}