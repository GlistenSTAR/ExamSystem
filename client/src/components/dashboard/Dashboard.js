import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { getQuestion, deleteProblem } from '../../actions/problemActions';
import { checkExam } from '../../actions/answerActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      examid:'',
      password:'',
      errors:{},
    }
  }
  componentDidMount(){
    const { user } = this.props.auth;
    this.props.getQuestion({name:user.name});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onDeleteClick(id) {
    this.props.deleteProblem(id, this.props.history);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const check = {
      examid: this.state.examid,
      password: this.state.password
    };

    this.props.checkExam(check, this.props.history);
  }

  render() {
    const { user } = this.props.auth;
    const {problems} = this.props.problems;
    const {errors} = this.state;
    let content, tablecontent;
    let num=1;

      if(user.role==="teacher"){
        if(problems!==null){
          tablecontent = problems.map(problem=>(
            <tr key={problem._id}>
              <td>{num++}</td>
              <td>{problem.question}</td>
              <td>{problem.answer.join(',')}</td>
              <td>{problem.examid}</td>
              <td><Moment format="YYYY-MM-DD HH:MM">{problem.create_at}</Moment></td>
              <td><button onClick={this.onDeleteClick.bind(this, problem._id)} className="btn"><i className="fas fa-trash-alt text-danger"/></button></td>
            </tr>
          ))
        } else {
          tablecontent =(<tr><td colSpan="5"><h4>There is no question.</h4></td></tr>)
        }
        
        content = (
          <div>
            <div align="center">
              <p className="lead text-muted">Please make question.{'   '}
              <Link className="btn btn-success ml-4" to={'/newExam'}>Make Question</Link></p>
            </div>
            <div className="mt-4 mb-4">
              <h4>{user.name}'s Question List</h4>
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr align="center">
                    <td>No</td>
                    <td width="60%">Question</td>
                    <td width="10%">Answer</td>
                    <td>ExamID</td>
                    <td>Create_Date</td>
                    <td>Setting</td>
                  </tr>
                </thead>
                <tbody align="center">
                  {tablecontent}
                </tbody>
              </table>
            </div>
          </div>          
        )
      } else {
        if(sessionStorage.isADMIN===true){
          this.props.history.push('/examination');
        }
        content = (
          <div align="center" className="mt-5 mb-5">
            <form noValidate onSubmit={this.onSubmit}>
              <p className="lead text-muted">Please enter the exam.{'   '}
              <button className="btn btn-success ml-4" type="submit">Enter the Exam</button></p>
              <div className="mt-5 mb-5">

                <TextFieldGroup
                    placeholder="Exam ID"
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
              </div>
            </form>
          </div>
        )
    }
    return (
      <div className="dashboard mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Welcome <span className="text-success">{user.name}</span></h1>
              <div>
                <p className="lead text-muted ml-4">
                </p>
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getQuestion: PropTypes.func.isRequired,
  deleteProblem: PropTypes.func.isRequired,
  errors: PropTypes.object,
  checkExam: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  problems: state.problems,
  errors: state.errors,
  answer: state.answer
});

export default connect(mapStateToProps, { getQuestion, deleteProblem, checkExam})(
  Dashboard
);
