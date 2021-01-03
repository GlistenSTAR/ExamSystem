import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Adminlogin } from '../../../actions/adminActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      userid: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.admin.isADMIN){
      this.props.history.push('/admindashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.admin.isADMIN) {
      this.props.history.push('/admindashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      userid: this.state.userid,
      password: this.state.password
    };

    this.props.Adminlogin(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Admin Login</h1>
              <p className="lead text-center">
                Sign in to your admin account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="AdminID"
                  name="userid"
                  type="userid"
                  value={this.state.userid}
                  onChange={this.onChange}
                  error={errors.userid}
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
      </div>
    );
  }
}

AdminLogin.propTypes = {
  Adminlogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});

export default connect(mapStateToProps, { Adminlogin })(AdminLogin);
