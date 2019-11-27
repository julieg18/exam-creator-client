import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  logoutHandler = () => {
    this.props.onLogout();
  };

  render() {
    const {
      isUserLoggedIn,
      location: { pathname },
    } = this.props;

    let authenticatedNavItems = (
      <Nav className="ml-auto">
        <Nav.Link
          as={Link}
          to="/create-exam"
          active={pathname === '/create-exam'}
        >
          Create A Exam
        </Nav.Link>
        <Nav.Link as={Link} to="/exams" active={pathname === '/exams'}>
          Exams
        </Nav.Link>
        <Button variant="outline-info" onClick={this.logoutHandler}>
          Logout
        </Button>
      </Nav>
    );

    let unauthenticatedNavItems = (
      <Nav className="ml-auto">
        <Nav.Link
          as={Link}
          to="/create-exam"
          active={pathname === '/create-exam'}
        >
          Create A Exam
        </Nav.Link>
        <Nav.Link as={Link} to="/auth" active={pathname === '/auth'}>
          Login/Signup
        </Nav.Link>
      </Nav>
    );

    if (window.innerWidth < 500) {
      authenticatedNavItems = (
        <DropdownButton
          alignRight
          className="ml-auto"
          id="dropdown-button"
          title="Menu"
          variant="info"
        >
          <Dropdown.Item
            as={Link}
            to="/create-exam"
            active={pathname === '/create-exam'}
          >
            Create A Exam
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/exams" active={pathname === '/exams'}>
            Exams
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={this.logoutHandler}>Logout</Dropdown.Item>
        </DropdownButton>
      );

      unauthenticatedNavItems = (
        <DropdownButton
          alignRight
          className="ml-auto"
          id="dropdown-button"
          title="Menu"
          variant="info"
        >
          <Dropdown.Item
            as={Link}
            to="/create-exam"
            active={pathname === '/create-exam'}
          >
            Create A Exam
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/auth" active={pathname === '/auth'}>
            Login/Signup
          </Dropdown.Item>
        </DropdownButton>
      );
    }
    return (
      <Navbar variant="light" className="NavigationBar">
        <Navbar.Brand className="NavBarBrand">Exam Creator</Navbar.Brand>
        {isUserLoggedIn ? authenticatedNavItems : unauthenticatedNavItems}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { isUserLoggedIn } = state.auth;
  return {
    isUserLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(authLogout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NavigationBar));
