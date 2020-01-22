import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './EditStudent.css';

class EditStudent extends React.Component {
  state = {
    studentName: this.props.student.name,
    error: '',
  };

  handleStudentNameChange = (e) => {
    this.setState({ studentName: e.target.value });
  };

  onEditStudentHandler = () => {
    const student = {
      name: this.state.studentName,
      id: this.props.student.id,
    };
    const isNameEmpty = /^\s*$/.test(student.name);
    if (isNameEmpty) {
      this.setState({
        error: 'Your student must have a name.',
      });
    } else {
      this.props.editStudent(student);
    }
  };

  render() {
    return (
      <div className="EditStudent">
        <div className="scrollOnOverflow">
          <h2>Edit Student</h2>
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
          <Button onClick={this.onEditStudentHandler} variant="info">
            Edit Student
          </Button>
        </div>
      </div>
    );
  }
}

export default EditStudent;
