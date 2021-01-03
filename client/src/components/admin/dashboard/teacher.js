
import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import AdminSiderbar from '../../common/AdminSiderbar';
import { getteacher,deleteteacher } from '../../../actions/adminActions';

class TeacherManager extends Component {
  componentDidMount(){
    this.props.getteacher();
  }
  
  onDeleteClick(id) {
    this.props.deleteteacher(id, this.props.history);
  }

  render() {
    const { teachers } = this.props.admin;
    let content, num=1;
    if(typeof teachers !== "undefined"){
      content = teachers.map(teacher=>{
        return (
        <tr key={teacher._id}>
          <td>{num++}</td>
          <td>{teacher.name}</td>
          <td>{teacher.email}</td>
          <td><img src={teacher.avatar} alt="users"/></td>
          <td><button onClick={this.onDeleteClick.bind(this, teacher._id)} className="btn"><i className="fas fa-eraser text-danger"/></button></td>
        </tr>
      )});
    }
    
    return (
     <div className="mt-5 mb-5 container-fluid dashboard">
       <h1 align="center">ExamSystem Manager</h1>
       <div className="row mt-5">
          <AdminSiderbar/>
        <div className="col-md-9 mb-5">
        <h2 align="center">Teacher manager</h2>
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

TeacherManager.propTypes = {
  auth: PropTypes.object.isRequired,
  getteacher: PropTypes.func.isRequired,
  deleteteacher: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(mapStateToProps, { getteacher, deleteteacher})(
  TeacherManager
);