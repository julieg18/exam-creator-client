import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSignup, authClearError } from '../../../store/actions/index';
import './Signup.css';

class Signup extends React.Component {
  componentWillUnmount() {
    this.props.onClearError();
  }

  submitHandler = (e) => {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    this.props.onSignup(user);
  };

  render() {
    return (
      <div className="Signup">
        {this.props.error ? (
          <Alert variant="info">
            <span>&#9888; </span>
            {this.props.error}
          </Alert>
        ) : (
          ''
        )}
        <h1>Signup</h1>
        <Link to="/login">Already have an account?</Link>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="username" placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="info" type="submit">
            Signup
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isUserLoggedIn, userId, loading, error } = state.auth;
  return {
    isUserLoggedIn,
    userId,
    loading,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignup: ({ username, email, password }) =>
      dispatch(authSignup(username, email, password)),
    onClearError: () => dispatch(authClearError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
