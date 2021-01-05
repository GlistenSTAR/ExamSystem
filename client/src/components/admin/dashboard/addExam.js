
import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { saveExamInfo } from '../../../actions/adminActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class AddExam extends Component {
  
  constructor() {
    super();
    this.state = {
      examid: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();

    const newExam = {
      examid: this.state.examid,
      password: this.state.password
    };
    this.props.saveExamInfo(newExam, this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="container mt-5 ">
       <h1 align="center">Create ExamID</h1>
       <form onSubmit={this.onSubmit} className="mb-5">
        <TextFieldGroup
          placeholder="ExamID"
          name="examid"
          type="text"
          value={this.state.examid}
          onChange={this.onChange}
          error={errors.examid}
        />
        <TextFieldGroup
          placeholder="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          error={errors.password}
        />
        <input type="submit" className="btn btn-info btn-block mt-3" />
       </form>
       <div className="row mb-5"></div>
      </div>
    );
  }
}

AddExam.propTypes = {
  saveExamInfo: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { saveExamInfo })(
  AddExam
);