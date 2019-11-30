import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'CreateAExamTitle.css';

class CreateAExamTitle extends React.Component {
  submitHandler = (e) => {
    console.log('title', e.target[0].value);
  };

  render() {
    return (
      <div className="CreateAExamTitle">
        <h2>What is your exam's title?</h2>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Button variant="info" type="submit">
            Next
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateAExamTitle;
