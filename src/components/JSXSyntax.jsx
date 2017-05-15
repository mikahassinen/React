import React from 'react';

const Component = props => {
  /* this is normal comment inside js*/
  console.log('this is normal javascript executed outside JSX');
  return (
    <div className='note-example-s'>
      <p>1. in jsx, css property 'class' is called
        'className' to avoid ambiguity with JS class</p>
      <p>2. /*this text will be VISIBLE🐋*/</p>
      <p>{'3.' /* ... BUT This is a comment inside jsx element and will be INVISIBLE 🐋*/}</p>
      <p>4. props.text</p>{/* this is plain text inside jsx*/}
      <p>5. {props.text}</p>{/* this is evaluated value inside css */}
      <p onClick={event => {
          console.log('onClick callback');
          console.log(event);
        }}>
        6. jsx allows writing inline event listeners
      </p>
      <p>7. According to best practice files with jsx should
        be have extension of .jsx instead of .js</p>
    </div>
  );
};

/* Something you do not need to understand yet -->*/
Component.propTypes = {
  text: React.PropTypes.string.isRequired,
};
Component.defaultProps = {
  text: 'DEFAULT TEXT',
};
/* <--*/

export default Component;
