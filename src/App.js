import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import CreateAExam from './components/CreateAExam/CreateAExam';
import Exams from './components/Exams/Exams';
import './App.css';
import { authLoginExistingUser } from './store/actions';

class App extends React.Component {
  componentDidMount() {
    this.props.loginExistingUser();
  }

  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Route path="/auth" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/create-exam" component={CreateAExam} />
        <Route path="/exams" component={Exams} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loginExistingUser: () => dispatch(authLoginExistingUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
