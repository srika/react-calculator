import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {

  return (
    <div className="square" onClick={() => props.getInput(props.children)} style={{ backgroundColor: props.style.backgroundColor }}>
      {props.children}
    </div>
  )
}

Button.propTypes = {
  getInput: PropTypes.func,
  style: PropTypes.object,
};

export default Button;