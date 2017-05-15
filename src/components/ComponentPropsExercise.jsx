import React from 'react';
import catInvalid from 'images/cat-invalid.png';
import Img from 'components/Img';

const { func, string, } = React.PropTypes;

/* ValidateInput is a component that displays error when user has typed in something that isn't valid
 TODO
 1. onBlur check if input value is valid and set state to invalid if it isn't.
 2. when user re-enters input, when first typing in invalid value
  set state to invalid:false ones input text validates to true
*/
class ValidateInput extends React.Component {

  static propTypes = {
    validate: func.isRequired,
    placeholder: string.isRequired,
    type: string.isRequired,
  };

  defaultProps = {
    type: 'text',
  };

  state = { text: '', invalid: false, };

  onTextChanged = (event) => {
    const text = event.target.value;
    const nextState = { text, };
  };

  onBlur= () => {
  };

  render() {
    const { text, invalid, } = this.state;
    const { type, } = this.props;
    return (
      <div className='validate-input-container'>
        <input
          type={type}
          placeholder={this.props.placeholder}
          className={invalid ? 'invalid-input' : 'input-default'}
          onChange={this.onTextChanged}
          value={text}
          onBlur={this.onBlur} />
        <Img
          className={invalid ? 'invalid-indicator-visible' : 'invalid-indicator-hidden'}
          src={catInvalid} />
      </div>
    );
  }

}

const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
const Form = () => (
  <div className='note-exercise-s'>
    <ValidateInput
      validate={text => emailRegex.test(text)}
      type='email'
      placeholder='email' />
    <ValidateInput
      validate={text => text.length > 8}
      type='password'
      placeholder='password' />
  </div>
    );

export default Form;

