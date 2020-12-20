import React from 'react';
import PropTypes from 'prop-types';
import { scientificData } from '../utils/index';

const ScientificMode = (props) => {
  return (
    <div className="calculator-wrapper">
      {scientificData.map((item, key) => (
        <div className="square" key={key} onClick={() => props.calculations.performScientificOperations(item)} style={{ color: props.style.color, backgroundColor: props.style.backgroundColor }}>
          {item}
        </div>
      ))}
    </div>
  )
}

ScientificMode.propTypes = {
  performScientificOperations: PropTypes.func,
  style: PropTypes.object,
};

export default ScientificMode;