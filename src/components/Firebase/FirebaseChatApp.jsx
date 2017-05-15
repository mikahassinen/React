import React from 'react';
import { values, } from 'common/utils';
import dbRef from 'common/firebaseDatabase';
import ChatLogin from './ChatLogin';
import ChatPage from './ChatPage';

const chat = dbRef.child('chat');

/* chat.set({users: {
 1: {username: 'Test',},
 },
 messages: {
 1: {author: 1,text: 'hello',created: new Date().toISOString(),},
 },});*/
class FirebaseChatApp extends React.Component {

  state = { user: null, users: {}, messages: {}, };

  componentWillMount() {
    this.users = chat.child('users');
    this.messages= chat.child('messages');
    this.users.on('value', (next) => {
      this.setState({ users: next.val(), });
    });
    // this.messages.push({text: 'hello chat',sent: new Date().toISOString(),});
    this.messages
      .limitToLast(500)
      .on('value', (next) => {
        this.setState({ messages: next.val(), });
      });
    let user = localStorage.getItem('chat-user');
    if (user) {
      user = JSON.parse(user);
      this.setState({ user, });
      this.sendMessage('has entered chat', user.username);
    }
  }

  componentWillUnmount() {
    this.users.off('value', err => console.log(err));
    this.messages.off('child_added', err => console.log(err));
    chat.off('value', err => console.log(err));
    if (this.state.user) {
      this.users.child(this.state.user.id).remove();
      this.sendMessage('... has left');
    }
  }

  handleLogin = (username) => {
    const user = { username, };
    user.id = this.users.push({ username, }).key;
    localStorage.setItem('chat-user', JSON.stringify(user));
    this.setState({ user, });
    this.sendMessage('has entered chat', username);
  }

  sendMessage = (text, author = this.state.user.username) => {
    const messages = values(this.state.messages);
    if (messages.length>0 && text!==messages[messages.length-1].text) {
      this.messages.push({
        text,
        author,
        created: new Date().toISOString(),
      });
    }
  }

  handleLogout = () => {
    localStorage.removeItem('chat-user');
    this.sendMessage('... has left');
    this.users.child(this.state.user.id).remove();
    this.setState({ user: null, });
  }

  render() {
    const { user, users, messages, } = this.state;
    if (user) {
      return (<ChatPage
        users={users}
        messages={messages}
        onMessageAdded={this.sendMessage}
        onLogout={this.handleLogout} />);
    }
    return (<ChatLogin
      users={this.state.users}
      onSubmit={this.handleLogin} />);
  }

}
export default FirebaseChatApp;
