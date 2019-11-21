import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Signup.css';
import { authSignup } from '../../store/actions/index';

class Signup extends React.Component {
  render() {
    return (
      <div className="Signup">
        <h1>Signup</h1>
        <Link to="/login">Already have an account?</Link>
        <Form>
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
  const { isUserLoggedIn, userId, loading, errors } = state.auth;
  return {
    isUserLoggedIn,
    userId,
    loading,
    errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignup: (username, email, password) =>
      dispatch(authSignup(username, email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
