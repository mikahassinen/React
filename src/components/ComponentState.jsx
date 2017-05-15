import React from 'react';

export default class ComponentState extends React.Component {

  reRenders = 0;
  maxLength = 15;
  state = { text: 'hello', };

  onTextChanged = (event) => {
    const { value, } = event.target;
    if (value.length <= this.maxLength) {
      this.setState({ text: value, });
    }
  };

  clearText = () => {
    this.setState({ text: '', });
  };

  render() {
    const { text, } = this.state;
    console.log('re-render with', text);
    return (
      <div className='note-example-s'>
        <p className='text-default'>Number of re-renders {this.reRenders++}</p>
        <label className='text-default'>{`${text.length}/${this.maxLength}`}</label>
        <input className='input-default' value={text} onChange={this.onTextChanged} />
        <button className={`button-default-${text.length+5}`} onClick={this.clearText}>Clear</button>
      </div>
    );
  }
}
