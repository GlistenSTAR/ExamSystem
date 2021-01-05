import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
//client component
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import NewQuestion from './components/question/question';
import Examination from './components/answer/answer';
import NotFound from './components/not-found/NotFound';
//admin component
import AdminLogin from './components/admin/auth/login';
import AdminDashboard from './components/admin/dashboard/dashboard';
import TeacherManager from './components/admin/dashboard/teacher';
import ProblemManager from './components/admin/dashboard/problem';
import ResultManager from './components/admin/dashboard/result';
import ExamManager from './components/admin/dashboard/exam';
import AddExam from './components/admin/dashboard/addExam';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={AdminLogin} />

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/question" component={NewQuestion} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/examination" component={Examination} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/newExam" component={AddExam}/>
              </Switch>



              <Switch>
                <AdminRoute exact path="/admindashboard" component={AdminDashboard}/>
              </Switch>
              <Switch>
                <AdminRoute exact path="/teacher" component={TeacherManager}/>
              </Switch>
              <Switch>
                <AdminRoute exact path="/problemmgr" component={ProblemManager}/>
              </Switch>
              <Switch>
                <AdminRoute exact path="/resultmgr" component={ResultManager}/>
              </Switch>
              <Switch>
                <AdminRoute exact path="/exammgr" component={ExamManager}/>
              </Switch>
              
              {/* <Route exact path="/admindashboard" component={AdminDashboard} /> */}

              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
