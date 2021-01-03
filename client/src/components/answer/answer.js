import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getExamination} from '../../actions/problemActions';
import {saveExamination} from '../../actions/answerActions';
import Subitem from './subitem';
// import useScreenRecording from "use-screen-recording";

class Examination extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      examquestion: {},
      examanswer: {}
    };
  }

  componentWillMount() {
    this.props.getExamination();
    this.setState({
      name: this.props.auth.user.name
    });
    if (sessionStorage.pass === true) {
      this.props.history.push('/examination')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      examanswer: {
        ...this.state.examanswer,
        [e.target.name]: e.target.value
      },
    });
  }

  onSubmit = (e) =>  {
    e.preventDefault();
    const examinationResult = {
      name: this.state.name,
      examanswer: this.state.examanswer,
      examid: localStorage.getItem('examid')
    };
    this.props.saveExamination(examinationResult, this.props.history);
  }

  render() {
    const {
      user
    } = this.props.auth;

    // const { isRecording, recording, toggleRecording } = useScreenRecording();
 
    const {
      examination
    } = this.props.problems;
    const examid = localStorage.getItem('examid');
    let content;

    if (examination !== null) {
      let num = 1;
      if (sessionStorage.pass === false) {
        this.props.history.push('/dashboard');
      }
      content = examination.map(exam => {
        return ( 
          <div className = "examcontent" key = {exam._id} >
            <div>
              <label className = "text-primary" > question {num++}: </label> 
              <label className = "question" > {exam.question} </label>     
            </div> 
            <div align = "left" className = "answer" >
              <Subitem answer = {exam.answer} num1 = {exam.question} onChange = {this.handleChange}/> 
            </div> 
          </div>
        )
      })
    }

    return ( 
      <div className = "question mb-5" >
        <div className = "row" >
          <div className = "col-md-8 m-auto" >
            {/* video capture area
            <div>
              <button onClick={toggleRecording}>
                {isRecording ? "Stop" : "Start Recording"}
              </button>

              {!!recording && (
                <video autoPlay src={recording && URL.createObjectURL(recording)} />
              )}
            </div> */}

            <h1 className = "display-4 mt-5" > Examination </h1>  
            <form noValidate onSubmit = {this.onSubmit } >
              <div className = "row mb-4 ">
                <div className = "col-md-8" >
                  <input className = "form-control-lg" name = "name" value = {user.name + ", " + user.role + "(" + examid + ")"} disabled = {true}/> 
                  <input type = "hidden" name = "hidden" value = {examid}/> 
                </div> 
                <div className = "col-md-4" align = "right">
                  <input type = "submit" className = "btn btn-primary btn-lg" />
                </div> 
              </div> 
              {content} 
              <div className = "mb-5" />
            </form> 
            
          </div> 
        </div> 
      </div>
    );
  }
}

Examination.propTypes = {
  getExamination: PropTypes.func.isRequired,
  saveExamination: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  pass: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  problems: state.problems,
  answer: state.answer
});

export default connect(mapStateToProps, {
  getExamination,
  saveExamination
})(withRouter(Examination));