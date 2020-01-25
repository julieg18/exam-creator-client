import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import CreateAExam from './components/CreateAExam/CreateAExam';
import EditAExam from './components/EditAExam/EditAExam';
import Exams from './components/Exams/Exams';
import TakeExam from './components/TakeExam/TakeExam';
import { authLoginExistingUser } from './store/actions';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.loginExistingUser();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/create-exam" component={CreateAExam} />
        <Route path="/take-exam/:examId" component={TakeExam} />
        <Redirect from="*" to="/create-exam" />
      </Switch>
    );
    if (this.props.isUserLoggedIn) {
      routes = (
        <Switch>
          <Redirect from="/login" to="create-exam" />
          <Redirect from="/auth" to="create-exam" />
          <Route path="/exams" component={Exams} />
          <Route path="/create-exam" component={CreateAExam} />
          <Route path="/edit-exam" component={EditAExam} />
          <Route path="/take-exam/:examId" component={TakeExam} />
          <Redirect from="*" to="/create-exam" />
        </Switch>
      );
    }
    return (
      <div className="App">
        {this.props.location.pathname.split('/')[1] !== 'take-exam' ? (
          <NavigationBar />
        ) : (
          ''
        )}
        {routes}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: { isUserLoggedIn },
  } = state;
  return { isUserLoggedIn };
}

function mapDispatchToProps(dispatch) {
  return {
    loginExistingUser: () => dispatch(authLoginExistingUser()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
