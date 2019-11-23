import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, withRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  render() {
    const {
      isUserLoggedIn,
      location: { pathname },
    } = this.props;

    let auth = isUserLoggedIn ? (
      <Button variant="outline-info">Logout</Button>
    ) : (
      <Nav.Link as={Link} to="/auth" active={pathname === '/auth'}>
        Login/Signup
      </Nav.Link>
    );
    let nav = (
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
        {auth}
      </Nav>
    );
    if (window.innerWidth < 500) {
      auth = isUserLoggedIn ? (
        <>
          <Dropdown.Divider />
          <Dropdown.Item>Logout</Dropdown.Item>
        </>
      ) : (
        <Dropdown.Item as={Link} to="/auth" active={pathname === '/auth'}>
          Login/Signup
        </Dropdown.Item>
      );
      nav = (
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
          {auth}
        </DropdownButton>
      );
    }
    return (
      <Navbar variant="light" className="NavigationBar">
        <Navbar.Brand className="NavBarBrand">Exam Creator</Navbar.Brand>
        {nav}
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NavigationBar));
