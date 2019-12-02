import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
// import CreateAExamStart from './components/CreateAExamStart/CreateAExamStart';
import CreateAExam from './components/CreateAExam/CreateAExam';
import Exams from './components/Exams/Exams';
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
        <Route
          path="/create-exam"
          render={(props) => <CreateAExam {...props} part="title" />}
        />
      </Switch>
    );
    if (this.props.isUserLoggedIn) {
      routes = (
        <Switch>
          <Redirect from="/login" to="create-exam" />
          <Redirect from="/auth" to="create-exam" />
          <Route path="/exams" component={Exams} />
          <Route
            path="/create-exam"
            render={(props) => <CreateAExam {...props} part="title" />}
          />
        </Switch>
      );
    }
    return (
      <div className="App">
        <NavigationBar />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
