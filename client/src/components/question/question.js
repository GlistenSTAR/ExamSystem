import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveProblem } from '../../actions/problemActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';


class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      question: '',
      answer: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newSolve = {
      name: this.props.auth.user.name,
      question: this.state.question,
      answer: this.state.answer
    };

    this.props.saveProblem(newSolve, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    
    return (
      <div className="question mb-5">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4">Question</h1>
              <p className="lead text-center">
                Create your new question
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="row mb-4">
                  <div className="col-md-8">
                    <input className="form-control-lg" name="name" value={user.name+", "+user.role} disabled={true}/>
                  </div>
                  <div className="col-md-4" align="right">
                    <input type="submit" className="btn btn-primary btn-lg"/>
                  </div>
                </div>
                
                <TextAreaFieldGroup
                  placeholder="Please write down question"
                  name="question"
                  value={this.state.question}
                  onChange={this.onChange}
                  error={errors.question}
                  rows="8"
                />
                <TextFieldGroup
                  placeholder="Write answers to your question(split with comma[,])"
                  name="answer"
                  type="text"
                  value={this.state.answer}
                  onChange={this.onChange}
                  error={errors.answer}
                />
                <div className="mb-5"/>
              </form>
            </div>
          </div>
      </div>
    );
  }
}

NewQuestion.propTypes = {
  saveProblem: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { saveProblem })(withRouter(NewQuestion));
