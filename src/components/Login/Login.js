import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <Link to="/signup">Haven't made an account?</Link>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="info" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
