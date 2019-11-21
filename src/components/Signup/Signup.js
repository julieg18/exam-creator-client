import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './Signup.css';

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

export default Signup;
