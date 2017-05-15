import React from 'react';
import LoggingComponent from 'components/LogginComponent';

const { string, func, bool, number, } = React.PropTypes;
class Button extends LoggingComponent {

  static propTypes = {
    text: string.isRequired,
    logIdentity: string,
    indentation: number,
    onClick: func,
  };

  renders = 0;

  render() {
    super.doLog('RENDER');
    const { text, onClick, logIdentity, className, } = this.props;
    return (
      <div className='component-profile'>
        <div className='component-identity'>{`Button ${logIdentity} `} <b>{++this.renders}</b></div>
        <button onClick={onClick} className={className}>{text}</button>
      </div>
    );
  }
}

class Input extends LoggingComponent {

  static propTypes = {
    text: string.isRequired,
    onTextChanged: func.isRequired,
    logIdentity: string,
  };

  renders = 0;

  render() {
    super.doLog('RENDER');
    const { text, onTextChanged, } = this.props;
    return (
      <div className='component-profile'>
        <div className='component-identity'>{`Input ${this.props.logIdentity}`} <b>{++this.renders}</b></div>
        <input
          value={text}
          className='input-default'
          onChange={e => onTextChanged(e.target.value)} />
      </div>);
  }
}

class TodoForm extends LoggingComponent {

  static propTypes = {
    onSubmit: func.isRequired,
    indentations: number,
    logIdentity: string.isRequired,
    buttonText: string.isRequired,
    mutable: bool.isRequired,
  };
  renders = 0;
  state = { text: '', };

  handleSubmit = () => {
    const { text, } = this.state;
    if (text) {
      this.props.onSubmit(text);
      this.setState({ text: '', });
    }
  };

  render() {
    super.doLog('RENDER');
    return (
      <div>
        <h3>See chrome logs to better see whats happening</h3>
        <div className='component-profile'>
          <div className='component-identity'>{`TodoForm ${this.props.logIdentity}`} <b>{++this.renders}</b></div>
          <Input
            indentations={(this.props.indentations || 0) + 1}
            logIdentity={this.props.logIdentity}
            text={this.state.text}
            onTextChanged={text => this.setState({ text, })} />
          <Button
            indentations={(this.props.indentations || 0) + 1}
            text={this.props.buttonText}
            logIdentity={this.props.logIdentity}
            onClick={this.handleSubmit}
            className='button-primary' />
        </div>
      </div>);
  }
}

class Item extends LoggingComponent {

  static propTypes = {
    onRemove: func.isRequired,
    logIdentity: string.isRequired,
    text: string.isRequired,
    indentations: number,
  };

  renders = 0;

  render() {
    super.doLog('RENDER');
    const { text, onRemove, logIdentity, } = this.props;
    return (
      <div className='component-profile'>
        <div className='component-identity'>{`Item ${logIdentity}`} <b>{++this.renders}</b></div>
        <h4> Todo: {text}</h4>
        <Button
          indentations={(this.props.indentations || 0) + 1}
          text='Remove'
          className='button-warning'
          logIdentity={this.props.logIdentity}
          onClick={onRemove} />
      </div>
    );
  }
}

export default class Todos extends LoggingComponent {

  state = { todos: [], };
  renders = 0;

  addTodo = (todo) => {
    let { todos, } = this.state;
    todos = [ ...todos, todo, ];
    this.setState({ todos, });
  };

  removeTodo = (index) => {
    let { todos, } = this.state;
    todos = [
      ...todos.slice(0, index),
      ...todos.slice((index + 1), todos.length),
    ];
    this.setState({ todos, });
  };

  render() {
    super.doLog('RENDER');
    return (
      <div className='component-profile-root'>
        <div className='component-identity'>Todos $ <b>{++this.renders}</b></div>
        <TodoForm
          indentations={(this.props.indentations || 0) + 1}
          mutable
          logIdentity={'$add_todo'}
          onSubmit={this.addTodo}
          buttonText='Add' />
        {this.state.todos.map((todo, i) => (
          <Item
            indentations={(this.props.indentations || 0) + 1}
            key={i}
            text={todo}
            logIdentity={`$todo_${i}`}
            onRemove={() => this.removeTodo(i)} />
          ))}
      </div>
    );
  }

}
