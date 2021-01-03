import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="col-md-3" >
        <div className="list-group">
        <Link to="/admindashboard" className="list-group-item list-group-item-action ">  <i className="fa fa-user"/>{' '}Student Manager</Link>
        <Link to="/teacher" className="list-group-item list-group-item-action ">  <i className="fas fa-graduation-cap"/>{' '}Teacher Manager</Link>
        <Link to="/problemmgr" className="list-group-item list-group-item-action ">  <i className="far fa-edit"/>{' '}Problem Manager</Link>
        <Link to="/resultmgr" className="list-group-item list-group-item-action ">  <i className="far fa-sticky-note"/>{' '}Result Manager</Link>
        <Link to="/exammgr" className="list-group-item list-group-item-action ">  <i className="far fa-sticky-note"/>{' '}Exam Manager</Link>
        </div>
    </div>
  );
};
