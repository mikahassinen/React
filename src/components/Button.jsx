import React from 'react';

function handleClick(e, onClick) {
  try {
    e.preventDefault();// prevent default for forms (get)
  } catch (Exception) {}
  onClick(e);
}
const Button = ({ onClick=console.log('onClick not implemented'), disabled, primary, warn, className = '', children, }) =>
  (<button
    className={`${(primary && 'button-primary') || (warn && ' button-warning') || (' button-default')} ${className}`}
    disabled={disabled}
    onClick={(e) => handleClick(e, onClick)}>
    {children}
  </button>);

const { func, string, bool, } = React.PropTypes;
Button.propTypes = {
  onClick: func,
  className: string,
  disabled: bool,
  warn: bool,
  primary: bool,
};
Button.defaultProps={
  text: '', //Just to make ide happy
};

export default Button;