import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateAExamTitle.css';

class CreateAExamTitle extends React.Component {
  submitHandler = (e) => {
    e.preventDefault();
    this.props.createExamTitle(e.target[0].value);
  };

  render() {
    return (
      <div className="CreateAExamTitle">
        <h1>What is your exam's title?</h1>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="title">
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Button
            variant="info"
            type="submit"
            onSubmit={this.props.createExamTitle}
          >
            Next
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateAExamTitle;
