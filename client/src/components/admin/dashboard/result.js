
import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import AdminSiderbar from '../../common/AdminSiderbar';
import { getResult, deleteResult } from '../../../actions/adminActions';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
import ResultContent from '../../common/ResultContent';

class ResultManager extends Component {
  constructor(){
    super();
    this.state = {
      showModal: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount(){
    this.props.getResult();
  }
  
  onDeleteClick(id) {
    this.props.deleteResult(id, this.props.history);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render() {
    const { results } = this.props.admin;
    let content, num=1;
    if(typeof results !== "undefined"){
      content = results.map(result=>{       
        return (
        <tr key={result._id}>
          <td>{num++}</td>
          <td>{result.user}</td>
          <td>{result.examid}</td>
          <td><Moment format="YYYY-MM-DD HH:MM">{result.create_at}</Moment></td>
          <td>
          <button className="btn" onClick={this.handleOpenModal}><i className="fas fa-eye text-success"/></button>
          
          <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
          >
            <button onClick={this.handleCloseModal}>×</button>
            <div className="row">
              <div className="col-md-3" align="right">
                  <label>Submitter : </label>{' '}{result.user}
              </div>
              <div className="col-md-4" align="center">
                <label>ExamID : </label>{' '}{result.examid}
              </div>
              <div className="col-md-5">
                <label>Submitter Date : </label>{' '}<Moment format="YYYY-MM-DD HH:MM">{result.date}</Moment>
              </div>
            </div>
            <ResultContent content={result.result}/>
          </ReactModal>
          
          <button onClick={this.onDeleteClick.bind(this, result._id)} className="btn"><i className="fas fa-eraser text-danger"/></button></td>
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
                <td>ExamID</td>
                <td>Submit Date</td>
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

ResultManager.propTypes = {
  auth: PropTypes.object.isRequired,
  getResult: PropTypes.func.isRequired,
  deleteResult: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});
//
export default connect(mapStateToProps, { getResult, deleteResult})(
  ResultManager
);