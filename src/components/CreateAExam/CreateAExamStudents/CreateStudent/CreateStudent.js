import React from 'react';
import shortid from 'shortid';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateStudent.css';

class CreateStudent extends React.Component {
  state = {
    studentName: '',
    error: '',
  };

  handleStudentNameChange = (e) => {
    this.setState({ studentName: e.target.value });
  };

  onCreateStudentHandler = () => {
    const student = {
      name: this.state.studentName,
      id: shortid.generate(),
    };
    const isNameEmpty = /^\s*$/.test(student.name);
    if (isNameEmpty) {
      this.setState({
        error: 'Your student must have a name.',
      });
    } else {
      this.props.onCreateStudent(student);
      this.setState({
        studentName: '',
        error: '',
      });
    }
  };

  render() {
    return (
      <div className="CreateStudent">
        <div className="scrollOnOverflow">
          <h2>Create Student</h2>
          {this.state.error ? (
            <Alert variant="info">
              <span>&#9888; </span>
              {this.state.error}
            </Alert>
          ) : (
            ''
          )}
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={this.handleStudentNameChange}
              placeholder="Name"
              value={this.state.studentName}
              type="text"
            ></Form.Control>
          </Form.Group>
          <Button onClick={this.onCreateStudentHandler} variant="info">
            Create Student
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateStudent;
