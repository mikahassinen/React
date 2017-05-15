import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';

const { func, } = React.PropTypes;
export default class AddUser extends React.Component {

  static propTypes = {
    onAddUser: func.isRequired,
  };

  state = { name: '', imageUrl: '', };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, imageUrl, } = this.state;
    if (name && imageUrl) {
      this.props.onAddUser({ name, imageUrl, });
      this.setState({ name: '', imageUrl: '', });
    }
  };

  render() {
    const { name, imageUrl, } = this.state;
    return (
      <form onSubmit={this.onSubmit} className='add-user'>
        <h4>Add user</h4>
        <Input
          placeholder='username'
          value={name}
          onChange={name => this.setState({ name, })} />
        <Input
          placeholder='image url'
          value={imageUrl}
          onChange={imageUrl => this.setState({ imageUrl, })} />
        <Button primary onClick={this.onSubmit}>Submit</Button>
      </form>
    );
  }
}
