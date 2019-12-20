import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CreateStudent extends React.Component {
  state = {
    questionName: '',
    error: '',
  };

  handleStudentNameChange = (e) => {
    this.setState({ studentName: e.target.value });
  };

  render() {
    return (
      <div className="CreateStudent">
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
            onChange={this.handleQuestionNameChange}
            placeholder="Name"
            value={this.state.studentName}
            type="text"
          ></Form.Control>
        </Form.Group>
        <Button variant="info">Create Student</Button>
      </div>
    );
  }
}

export default CreateStudent;
