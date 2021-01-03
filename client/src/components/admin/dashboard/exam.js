
import React, { Component } from "react"; 
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import AdminSiderbar from '../../common/AdminSiderbar';
import { getExam, deleteExam } from '../../../actions/adminActions';


class ExamManager extends Component {
  componentDidMount(){
    this.props.getExam();
  }
  
  onDeleteClick(id) {
    this.props.deleteExam(id, this.props.history);
  }

  

  render() {
    const { exams } = this.props.admin;
    let content, num=1;
    if(typeof exams !== "undefined"){
      content = exams.map(exam=>{
        return (
        <tr key={exam._id}>
          <td>{num++}</td>
          <td>{exam.examid}</td>
          <td>{exam.password}</td>
          <td><button onClick={this.onDeleteClick.bind(this, exam._id)} className="btn"><i className="fas fa-eraser text-danger"/></button></td>
        </tr>
      )});
    }
    
    return (
     <div className="mt-5 mb-5 container-fluid dashboard">
       <h1 align="center">ExamSystem Manager</h1>
       <div className="row mt-5">
          <AdminSiderbar/>
        <div className="col-md-9 mb-5">
        <h2 align="center">Exam manager</h2>
        <div align="right">
          <Link to="/addExam" className="btn btn-primary newexam">+ New</Link>
        </div>
          <table className="table table-hover">
            <thead align="center">
              <tr>
                <td>No</td>
                <td>ExamID</td>
                <td>Password</td>
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

ExamManager.propTypes = {
  auth: PropTypes.object.isRequired,
  getExam: PropTypes.func.isRequired,
  deleteExam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(mapStateToProps, { getExam, deleteExam})(
  ExamManager
);