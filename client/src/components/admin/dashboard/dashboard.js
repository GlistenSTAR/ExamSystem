
import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import AdminSiderbar from '../../common/AdminSiderbar';
import { getStudent,deleteStudent } from '../../../actions/adminActions';

class AdminDashboard extends Component {
  componentDidMount(){
    this.props.getStudent();
  }
  
  onDeleteClick(id) {
    this.props.deleteStudent(id, this.props.history);
  }

  render() {
    const { students } = this.props.admin;
    let content, num=1;
    if(typeof students !== "undefined"){
      content = students.map(student=>{
        return (
        <tr key={student._id}>
          <td>{num++}</td>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td><img src={student.avatar} alt="users"/></td>
          <td><button onClick={this.onDeleteClick.bind(this, student._id)} className="btn"><i className="fas fa-eraser text-danger"/></button></td>
        </tr>
      )});
    }
    
    return (
     <div className="mt-5 mb-5 container-fluid dashboard">
       <h1 align="center">ExamSystem Manager</h1>
       <div className="row mt-5">
          <AdminSiderbar/>
        <div className="col-md-9 mb-5">
          <h2 align="center">Student manager</h2>
          <table className="table table-hover">
            <thead align="center">
              <tr>
                <td>No</td>
                <td>Name</td>
                <td>Email</td>
                <td>Photo</td>
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

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(mapStateToProps, { getStudent, deleteStudent })(
  AdminDashboard
);