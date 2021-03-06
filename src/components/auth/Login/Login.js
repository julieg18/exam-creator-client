import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import LoadingButton from '../../common/LoadingButton/LoadingButton';
import { authLogin, authClearError } from '../../../store/actions/index';
import './Login.css';

class Login extends React.Component {
  componentWillUnmount() {
    this.props.onClearError();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    this.props.onLogin(user);
  };

  render() {
    return (
      <div className="Login">
        {this.props.error ? (
          <Alert variant="info">
            <span>&#9888; </span>
            {this.props.error}
          </Alert>
        ) : (
          ''
        )}
        <h1>Login</h1>
        <Link to="/auth">Haven't made an account?</Link>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <LoadingButton
            variant="info"
            type="submit"
            loading={this.props.loading}
            size="md"
            classes=""
          >
            Login
          </LoadingButton>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    auth: { isUserLoggedIn, error, loading },
  } = state;
  return { isUserLoggedIn, error, loading };
}

function mapDispatchtoProps(dispatch) {
  return {
    onLogin: ({ email, password }) => dispatch(authLogin(email, password)),
    onClearError: () => dispatch(authClearError()),
  };
}

export default connect(mapStateToProps, mapDispatchtoProps)(Login);
