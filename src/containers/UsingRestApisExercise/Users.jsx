import React from 'react';
import { connect, } from 'react-redux';
import { browserHistory, } from 'react-router';
import AddUser from 'components/UsingRestApisExercise/AddUser';
import UserListItem from 'components/UsingRestApisExercise/UserListItem';
import * as actions from 'actions/userActions';

const { keys, } = Object;
const { func, object, } = React.PropTypes;

// TODO add functionality to update user
@connect(({ users, }) => ({ users, }), ({...actions}))
export default class UsersComponent extends React.Component {

  static propTypes = {
    users: object.isRequired,
    getAllUsers: func.isRequired,
    removeUser: func.isRequired,
    createUser: func.isRequired,
  };

  render() {
    const { users, createUser, removeUser, } = this.props;
    const { content, } = users;
    return (
      <div className='user-list-container'>
        {keys(content).map(id => (
          <UserListItem
            key={id}
            {...content[id]}
            onRemove={removeUser}
            onSelect={this.onSelectUser} />))}
        <AddUser onAddUser={createUser} />
      </div>
    );
  }

  onSelectUser = (userId) => {
    browserHistory.push(`/usingRestApis/exercise/${userId}`);
  };

  componentDidMount() {
    this.props.getAllUsers();
  }
}
