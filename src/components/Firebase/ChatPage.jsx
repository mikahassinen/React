import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import { values, } from 'common/utils';

const { object, func, } = React.PropTypes;
export default class ChatPage extends React.Component {

  static propTypes = {
    users: object.isRequired,
    messages: object.isRequired,
    onMessageAdded: func.isRequired,
    onLogout: func.isRequired,
  }

  state = { inputValue: '', }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate({ messages: prevMessages, }) {
    let { messages, } = this.props;
    messages = values(messages);
    prevMessages = values(prevMessages);
    const prevLastIndex = prevMessages.length-1;
    const currentLastIndex = messages.length-1;
    if (prevLastIndex!==currentLastIndex
      || messages[currentLastIndex] !==prevMessages[prevLastIndex]) {
      this.scrollToBottom();
    }
  }

  handleSubmit = (e) => {
    try { e.preventDefault(); } catch (e) {}
    const { inputValue, } = this.state;
    if (inputValue) {
      this.props.onMessageAdded(inputValue);
      this.setState({ inputValue: '', });
    }
  }

  scrollToBottom() {
    if (this.messagesEnd) {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({ behavior: 'smooth', });
    }
  }

  render() {
    const { users, messages, onLogout, } = this.props;
    return (
      <div className='chat-app'>
        <Button
          warn
          className='chat-logout-button'
          onClick={onLogout}>Logout</Button>
        <div className='chat-upper-container'>
          <div className='chat-feed'>
            {values(messages).map((message, i) => (
              <p
                ref={(el) => { this.messagesEnd = el; }}
                key={i}
                className='chat-message'><span
                  className='chat-message-author'>{message.author}</span>:{message.text}
              </p>
            ))}
          </div>
          <div className='chat-users'>
            {values(users).map(({ username, }) => <p key={username}>{username}</p>)}
          </div>
        </div>
        <form className='chat-lower-container' onSubmit={this.handleSubmit}>
          <Input
            className='chat-input'
            value={this.state.inputValue}
            onChange={inputValue => this.setState({ inputValue, })} />
          <Button
            primary
            className='chat-submit'
            onClick={this.handleSubmit}>Send
          </Button>
        </form>
      </div>
    );
  }
}
