
import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import AdminSiderbar from '../../common/AdminSiderbar';
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
     <div className="mt-5 mb-5 container-fluid">
       <h1 align="center">ExamSystem Manager</h1>
       <div className="row mt-5">
          <AdminSiderbar/>
        <div className="col-md-9 mb-5">
          <h2 align="center">Add Exam</h2>
          <form onSubmit={this.onSubmit}>
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
          <input type="submit" className="btn btn-info btn-block mt-4 mb-5" />
          </form>
        </div>  
       </div>
     </div>
    );
  }
}

AddExam.propTypes = {
  saveExamInfo: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});

export default connect(mapStateToProps, { saveExamInfo })(
  AddExam
);