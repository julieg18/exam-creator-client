import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';
import LoadingButton from '../common/LoadingButton/LoadingButton';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  state = {
    isWindowMobileSize: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateIsWindowMobileSize.bind(this));
    this.updateIsWindowMobileSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsWindowMobileSize);
  }

  updateIsWindowMobileSize = () => {
    let isCurrentWindowMobileSize = window.innerWidth <= 500;
    if (isCurrentWindowMobileSize !== this.state.isWindowMobileSize) {
      this.setState({ isWindowMobileSize: window.innerWidth <= 500 });
    }
  };

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
        <Nav.Link as={Link} to="/edit-exam" active={pathname === '/edit-exam'}>
          Edit A Exam
        </Nav.Link>
        <Nav.Link as={Link} to="/exams" active={pathname === '/exams'}>
          Exams
        </Nav.Link>
        <LoadingButton
          variant="outline-info"
          type="button"
          onClickFunc={this.logoutHandler}
          loading={this.props.loading}
          size="md"
          classes=""
        >
          Logout
        </LoadingButton>
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

    if (this.state.isWindowMobileSize) {
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
          <Dropdown.Item
            as={Link}
            to="/edit-exam"
            active={pathname === '/edit-exam'}
          >
            Edit A Exam
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
  const { isUserLoggedIn, loading } = state.auth;
  return {
    isUserLoggedIn,
    loading,
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
