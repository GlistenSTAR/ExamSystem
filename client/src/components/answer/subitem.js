import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Subitem extends Component {
  render() {
    const { answer, num1, onChange} = this.props;
    return answer.map(asw => (
        <div className="form-check-inline" key={asw}>
            <label className="form-check-label">
                <input type="radio" className="form-check-input" name={num1} onChange={onChange} value={asw}/>{asw}
            </label>
        </div>
    ));
  }
}

Subitem.propTypes = {
  answer: PropTypes.array.isRequired,
  num1: PropTypes.string,
  onChange: PropTypes.func
};

export default Subitem;
