import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import { values, } from 'common/utils';

const { oneOfType, object, array, func, } = React.PropTypes;
export default class ChatLogin extends React.Component {

  static propTypes = {
    users: oneOfType([ object, array, ]),
    onSubmit: func,
  }

  state = { isValid: false, username: '', };

  validateUsername(username) {
    const { users, } = this.props;
    return username.length>2 && !values(users)
      .some(user => user && user.username===username);
  }

  handleSubmit = (e) => {
    try { e.preventDefault(); } catch (e) { /* screw it */ }
    if (this.state.isValid) {
      this.props.onSubmit(this.state.username);
    }
  }

  render() {
    const { username, isValid, } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={username}
          placeholder='username'
          onChange={username => this.setState({ username, isValid: this.validateUsername(username), })} />
        <Button primary onClick={this.handleSubmit} disabled={!isValid}>Submit</Button>
      </form>);
  }
}
