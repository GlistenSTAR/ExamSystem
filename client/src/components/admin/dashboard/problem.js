
import React, { Component } from "react"; 
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import AdminSiderbar from '../../common/AdminSiderbar';
import { getproblem, deleteproblem } from '../../../actions/adminActions';
import Moment from 'react-moment';


class ProblemManager extends Component {
  componentDidMount(){
    this.props.getproblem();
  }
  
  onDeleteClick(id) {
    this.props.deleteproblem(id, this.props.history);
  }

  render() {
    const { problems } = this.props.admin;
    let content, num=1;
    if(typeof problems !== "undefined"){
      content = problems.map(problem=>{
        return (
        <tr key={problem._id}>
          <td>{num++}</td>
          <td>{problem.name}</td>
          <td>{problem.question}</td>
          <td>{problem.answer.join(', ')}</td>
          <td><Moment format="YYYY-MM-DD HH:MM">{problem.create_at}</Moment></td>
          <td><button onClick={this.onDeleteClick.bind(this, problem._id)} className="btn"><i className="fas fa-eraser text-danger"/></button></td>
        </tr>
      )});
    }
    
    return (
     <div className="mt-5 mb-5 container-fluid dashboard">
       <h1 align="center">ExamSystem Manager</h1>
       <div className="row mt-5">
          <AdminSiderbar/>
        <div className="col-md-9 mb-5">
        <h2 align="center">Question manager</h2>
          <table className="table table-hover">
            <thead align="center">
              <tr>
                <td>No</td>
                <td>Submitter</td>
                <td>Question</td>
                <td>Answer</td>
                <td>Date</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody align="center">
              {content}
            </tbody>
          </table>
        </div>  
       </div>
     </div>
    );
  }
}

ProblemManager.propTypes = {
  auth: PropTypes.object.isRequired,
  getproblem: PropTypes.func.isRequired,
  deleteproblem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(mapStateToProps, { getproblem, deleteproblem})(
  ProblemManager
);