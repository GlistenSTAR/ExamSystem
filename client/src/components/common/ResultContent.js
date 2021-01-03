import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultContent extends Component {
  render() {
    const { content } = this.props;
    var keys=[];
    var values=[];

    for(var key in content){
      keys.push(key);
      values.push(content[key]);
    }


    return keys.map( (value,key) => (
        <div key={key} className="ttt">
          <label>Question : </label>{ value}<br/>
          <label>Answer : </label>{ content[value]}
        </div>
    ));
  }
}

ResultContent.propTypes = {
  content: PropTypes.object.isRequired
};

export default ResultContent;
